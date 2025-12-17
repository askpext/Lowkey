import fs from "fs";
import https from "https";
import { MODEL_DIR, MODEL_PATH } from "./paths";

const MODEL_URL =
  "https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct-GGUF/resolve/main/qwen2.5-0.5b-instruct-q4_0.gguf";

export function modelExists(): boolean {
  return (
    fs.existsSync(MODEL_PATH) &&
    fs.statSync(MODEL_PATH).size > 50_000_000
  );
}

export function downloadModel(
  onProgress: (percent: number) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(MODEL_DIR, { recursive: true });

    if (fs.existsSync(MODEL_PATH)) {
      fs.unlinkSync(MODEL_PATH); // delete broken file
    }

    console.log("Starting Qwen model download");

    function request(url: string) {
      https.get(url, res => {
        // handle redirect
        if (
          res.statusCode &&
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          request(res.headers.location);
          return;
        }

        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }

        const total = Number(res.headers["content-length"]);
        let downloaded = 0;

        const file = fs.createWriteStream(MODEL_PATH);

        res.on("data", chunk => {
          downloaded += chunk.length;
          onProgress(Math.floor((downloaded / total) * 100));
        });

        res.pipe(file);

        file.on("finish", () => {
          file.close();
          console.log("Qwen model download complete");
          resolve();
        });
      }).on("error", reject);
    }

    request(MODEL_URL);
  });
}
