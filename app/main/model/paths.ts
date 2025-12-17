import path from "path";
import { app } from "electron";

export const MODEL_DIR = path.join(app.getPath("userData"), "models");

export const MODEL_PATH = path.join(
  MODEL_DIR,
  "qwen2.5-0.5b-instruct-q4_0.gguf"
);
