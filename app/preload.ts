import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  modelStatus: () =>
    ipcRenderer.invoke("model-status"),

  downloadModel: () =>
    ipcRenderer.invoke("download-model"),

  startLlama: () =>
    ipcRenderer.invoke("start-llama"),

  onProgress: (cb: (percent: number) => void) =>
    ipcRenderer.on("download-progress", (_event, percent) => cb(percent)),

  /* ================= EXISTING ================= */

  sendMessage: (text: string) =>
    ipcRenderer.invoke("send-message", text),

  stopGeneration: () =>
    ipcRenderer.invoke("stop-generation"),

  onToken: (cb: (token: string) => void) =>
    ipcRenderer.on("token", (_event, token) => cb(token)),

  onStreamDone: (cb: () => void) =>
    ipcRenderer.on("stream-done", cb),

  onReady: (cb: () => void) =>
    ipcRenderer.on("ready", cb),

  /* ================= CHAT STORAGE ================= */

  saveChat: (chatId: string, messages: any[]) =>
    ipcRenderer.invoke("save-chat", chatId, messages),

  loadChats: () =>
    ipcRenderer.invoke("load-chats"),

  loadChat: (chatId: string) =>
    ipcRenderer.invoke("load-chat", chatId),

  deleteChat: (chatId: string) =>
    ipcRenderer.invoke("delete-chat", chatId),
});
