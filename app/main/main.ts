import { app, BrowserWindow } from "electron";
import path from "path";
import os from "os";
import { registerIpc } from "./ipc";
import { startLlama } from "./llama/runner";
import { waitForLlama } from "./llama/health";

let mainWindow: BrowserWindow | null = null;

function getAppIcon() {
  const base = path.join(__dirname, "../resources");
  if (os.platform() === "linux") {
    return path.join(base, "linux/icon.png");
  }
  return path.join(base, "icon.ico");
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    backgroundColor: "#0f0f0f",
    // Option 1: Hides it but shows on 'Alt' key press (Good for UX)
    // autoHideMenuBar: true, 
    icon: getAppIcon(),
    webPreferences: {
      preload: path.join(__dirname, "../preload.js"),
      contextIsolation: true
    }
  });

  // Option 2: Completely removes the menu (What you asked for)
  mainWindow.removeMenu();

  mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));

  // Start llama and wait for it to be ready
  startLlama();
  waitForLlama(mainWindow);

  // Register IPC handlers with window reference
  registerIpc(mainWindow);
}

app.whenReady().then(() => {
  console.log("USER DATA PATH:", app.getPath("userData"));
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});