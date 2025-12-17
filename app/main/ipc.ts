import { ipcMain, BrowserWindow, app } from "electron";
import fs from "fs/promises";
import path from "path";

/* ==================== SYSTEM PROMPT ==================== */

const SYSTEM_PROMPT = `You are a friendly and capable AI assistant running locally on the user's computer.

Your personality:
- Conversational and helpful, like chatting with a knowledgeable friend
- Direct and concise - get to the point without excessive formality
- Adaptable - match the user's tone (casual, technical, creative, etc.)

Your capabilities:
- Coding help: write, debug, explain code in any language
- General knowledge: science, history, math, current events (up to your training data)
- Creative tasks: writing, brainstorming, problem-solving
- Technical explanations: make complex topics understandable

Guidelines:
- Be natural - no corporate speak or robotic responses
- If you don't know something, say so honestly
- For code, provide working examples with brief explanations
- Keep responses focused and relevant

You're here to help however the user needs - whether that's debugging JavaScript, explaining quantum physics, or discussing life stuff.`;

/* ==================== CHAT STORAGE ==================== */

const CHATS_DIR = path.join(app.getPath("userData"), "chats");

async function ensureChatsDir() {
  await fs.mkdir(CHATS_DIR, { recursive: true });
}

/* ==================== STREAM CONTROL ==================== */

let currentController: AbortController | null = null;

/* ==================== IPC REGISTRATION ==================== */

export function registerIpc(mainWindow: BrowserWindow) {

  /* -------- SEND MESSAGE (STREAMING) -------- */

  ipcMain.handle("send-message", async (_event, text: string) => {
    currentController = new AbortController();

    try {
      const response = await fetch("http://127.0.0.1:11435/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "qwen2.5-0.5b-instruct",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: text }
          ],
          stream: true,
          temperature: 0.4,
          max_tokens: 2048
        }),
        signal: currentController.signal
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error("No response body");

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          mainWindow.webContents.send("stream-done");
          break;
        }

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n").filter(l => l.trim() !== "");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;

          const data = line.slice(6);
          if (data === "[DONE]") {
            mainWindow.webContents.send("stream-done");
            continue;
          }

          try {
            const json = JSON.parse(data);
            const token = json.choices?.[0]?.delta?.content;
            if (token) {
              mainWindow.webContents.send("token", token);
            }
          } catch {
            // ignore malformed chunks
          }
        }
      }
    } catch (error: any) {
      if (error.name === "AbortError") {
        mainWindow.webContents.send("stream-done");
      } else {
        console.error("Error sending message:", error);
        mainWindow.webContents.send(
          "token",
          "\n\n**Error:** Could not connect to local AI."
        );
        mainWindow.webContents.send("stream-done");
      }
    } finally {
      currentController = null;
    }
  });

  /* -------- STOP GENERATION -------- */

  ipcMain.handle("stop-generation", async () => {
    if (currentController) {
      currentController.abort();
      currentController = null;
    }
  });

  /* ==================== CHAT PERSISTENCE ==================== */

  ipcMain.handle("save-chat", async (_event, chatId: string, messages: any[]) => {
    await ensureChatsDir();
    const filePath = path.join(CHATS_DIR, `${chatId}.json`);

    await fs.writeFile(
      filePath,
      JSON.stringify(
        {
          id: chatId,
          messages,
          updatedAt: Date.now()
        },
        null,
        2
      )
    );
  });

  ipcMain.handle("load-chats", async () => {
    await ensureChatsDir();
    const files = await fs.readdir(CHATS_DIR);

    const chats = await Promise.all(
      files
        .filter(f => f.endsWith(".json"))
        .map(async f => {
          const data = await fs.readFile(path.join(CHATS_DIR, f), "utf-8");
          return JSON.parse(data);
        })
    );

    return chats.sort((a, b) => b.updatedAt - a.updatedAt);
  });

  ipcMain.handle("load-chat", async (_event, chatId: string) => {
    const filePath = path.join(CHATS_DIR, `${chatId}.json`);
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  });

  ipcMain.handle("delete-chat", async (_event, chatId: string) => {
    const filePath = path.join(CHATS_DIR, `${chatId}.json`);
    await fs.unlink(filePath);
  });
}
