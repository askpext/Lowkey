// build.js - Handles TypeScript compilation + copying renderer assets
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🔨 Building Local Copilot...\n");

// 1. Compile TypeScript
console.log("📦 Compiling TypeScript...");
try {
  execSync("npx tsc", { stdio: "inherit" });
  console.log("✅ TypeScript compiled\n");
} catch {
  console.error("❌ TypeScript compilation failed");
  process.exit(1);
}

// 2. Copy renderer folder (HTML + JS + CSS)
console.log("📄 Copying renderer files...");

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src)) {
    const srcPath = path.join(src, entry);
    const destPath = path.join(dest, entry);

    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  const rendererSrc = path.join(__dirname, "app", "renderer");
  const rendererDest = path.join(__dirname, "dist", "renderer");

  copyDir(rendererSrc, rendererDest);
  console.log("✅ Renderer files copied\n");
} catch (error) {
  console.error("❌ Failed to copy renderer files:", error.message);
  process.exit(1);
}

console.log("✨ Build complete!\n");
