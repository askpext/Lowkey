import fs from "fs";
import path from "path";
import https from "https";
import { app } from "electron";

export const MODEL_NAME = "qwen2.5-0.5b-instruct-q4_0.gguf";

export const MODEL_URL =
  "https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct-GGUF/resolve/main/" +
  MODEL_NAME;

export const MODEL_DIR = path.join(app.getPath("userData"), "models");
export const MODEL_PATH = path.join(MODEL_DIR, MODEL_NAME);

export function modelExists() {
  return fs.existsSync(MODEL_PATH) && fs.statSync(MODEL_PATH).size > 50_000_000;
}

function download(url: string, dest: string, onProgress: (p: number) => void) {
  return new Promise<void>((resolve, reject) => {
    https.get(url, (res) => {
      // 🔴 handle redirects
      if (res.statusCode === 302 || res.statusCode === 301) {
        return download(res.headers.location!, dest, onProgress)
          .then(resolve)
          .catch(reject);
      }

      if (res.statusCode !== 200) {
        reject(new Error("Download failed: " + res.statusCode));
        return;
      }

      const total = Number(res.headers["content-length"]);
      let received = 0;

      const file = fs.createWriteStream(dest);

      res.on("data", (chunk) => {
        received += chunk.length;
        onProgress(Math.floor((received / total) * 100));
      });

      res.pipe(file);

      file.on("finish", () => {
        file.close();
        resolve();
      });
    }).on("error", reject);
  });
}

export async function downloadModel(onProgress: (p: number) => void) {
  fs.mkdirSync(MODEL_DIR, { recursive: true });

  // Delete broken file if exists
  if (fs.existsSync(MODEL_PATH)) {
    fs.unlinkSync(MODEL_PATH);
  }

  await download(MODEL_URL, MODEL_PATH, onProgress);
}
