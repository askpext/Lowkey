import http from "http";
import { BrowserWindow } from "electron";

export function waitForLlama(win: BrowserWindow) {
  const timer = setInterval(() => {
    http
      .get("http://127.0.0.1:11435/health", res => {
        if (res.statusCode === 200) {
          clearInterval(timer);
          console.log("🟢 llama-server is ready");
          win.webContents.send("ready");
        }
      })
      .on("error", () => {});
  }, 500);
}
