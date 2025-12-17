import { spawn } from "child_process";
import path from "path";
import os from "os";
import { app } from "electron";
import { MODEL_PATH } from "../model/paths";

let proc: any = null;

function getBinary() {
  const base = app.isPackaged
    ? process.resourcesPath
    : path.join(process.cwd(), "resources");

  if (os.platform() === "win32") {
    return path.join(base, "llama/windows-x64/llama-server.exe");
  }

  if (os.platform() === "linux") {
    return path.join(base, "llama/linux-x64/llama-server");
  }

  throw new Error("Unsupported OS");
}

export function startLlama() {
  if (proc) return;

  console.log("🚀 Starting llama-server with model:");
  console.log(MODEL_PATH);

  proc = spawn(
    getBinary(),
    [
      "--model", MODEL_PATH,
      "--host", "127.0.0.1",
      "--port", "11435",
      "--ctx-size", "2048",
      "--no-warmup"
    ],
    { stdio: "inherit" }
  );

  proc.on("exit", (code: any) => {
    console.error("llama-server exited with code", code);
    proc = null;
  });
}
