<div align="center">
  <img src="public/placeholder-logo.svg" alt="Lowkey Logo" width="120" height="120" />
  
  # Lowkey
  
  **Your AI assistant. Private, fast, and completely offline.**
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
  
  [Download](#download) • [Features](#features) • [Getting Started](#getting-started) • [Contributing](#contributing)
  
</div>

---

## Overview

**Lowkey** is a privacy-first AI assistant that runs entirely on your device. No internet required, no data sent to the cloud—just pure, local AI power at your fingertips. Built with Next.js and designed with a minimal, Apple-inspired aesthetic, Lowkey brings enterprise-grade AI capabilities to your desktop without compromising your privacy.

### Why Lowkey?

- **100% Private** - Your conversations never leave your device
- **Lightning Fast** - Local processing means instant responses
- **Works Offline** - No internet connection required
- **Open Source** - Full transparency, community-driven development
- **Cross-Platform** - Available for macOS, Windows, and Linux

---

## Features

### 🔒 **Privacy First**
All processing happens on your device. Your data, your control. No cloud servers, no data collection, no tracking.

### ⚡ **Blazing Fast**
Local inference means zero latency. Get instant responses without waiting for API calls or network delays.

### 💻 **Cross-Platform**
Native apps for macOS, Windows, and Linux. Consistent experience across all your devices.

### 🎨 **Beautiful Design**
Clean, minimal interface inspired by Apple's design language. Dark mode support included.

### 🧠 **Powerful AI Models**
Support for multiple local AI models including LLaMA, Mistral, and more. Choose the model that fits your needs.

### 🔧 **Customizable**
Tailor the experience to your workflow. Custom prompts, themes, and keyboard shortcuts.

---

## Screenshots

<div align="center">
  <img src="public/modern-ai-chat-interface-with-dark-sidebar-and-con.jpg" alt="Lowkey Interface" width="800" />
  <p><em>Clean, minimal chat interface with dark sidebar</em></p>
</div>

---

## Download

Get Lowkey for your platform:

| Platform | Download |
|----------|----------|
| 🪟 **Windows** | [Download for Windows](https://github.com/askpext/Lowkey/releases/download/v0.1.1/Lowkey-Portable-0.1.0.exe) |
| 🐧 **Linux** | [Download for Linux](https://github.com/askpext/Lowkey/releases/download/v0.1.1/Lowkey-0.1.0.AppImage) |

---

## Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/askpext/Lowkey.git
   cd Lowkey
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the app.

### Building for Production

```bash
pnpm build
pnpm start
```

### Building Desktop Apps

We use Electron to create native desktop applications:

```bash
# Build for your current platform
pnpm build:electron

# Build for specific platforms
pnpm build:mac
pnpm build:windows
pnpm build:linux
```


## Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

- 🐛 **Report Bugs** - Found a bug? [Open an issue](https://github.com/askpext/Lowkey/issues/new)
- 💡 **Suggest Features** - Have an idea? We'd love to hear it
- 📝 **Improve Documentation** - Help make our docs better
- 🔧 **Submit PRs** - Fix bugs or add features

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit with clear messages**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks



## Privacy & Security

Lowkey is built with privacy as the foundation:

- **No Telemetry** - We don't collect any usage data
- **No Analytics** - No tracking scripts or third-party services
- **No Cloud** - All processing happens locally on your device
- **Open Source** - Full transparency, audit the code yourself
- **Encrypted Storage** - Your conversations are encrypted at rest

---

## FAQ

### How does Lowkey compare to ChatGPT?

Lowkey runs entirely on your device, meaning your conversations are 100% private. ChatGPT requires an internet connection and sends your data to OpenAI's servers.

### What models does Lowkey support?

We will support popular open-source models in future, for now Qwen.

### Does it work without internet?

Yes! Once you've downloaded a model, Lowkey works completely offline.

### What are the hardware requirements?

Minimum 2GB RAM, though 4GB is recommended for larger models. Most modern computers from the last 5 years will be cool.

---

## Support

Need help? Here's how to get support:

- 📧 **Email** -  contact@pext.org

---

## License

Lowkey is open source software licensed under the [MIT License](LICENSE).

```
MIT License

Copyright (c) 2024 Lowkey

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Acknowledgments

Built with love by the Lowkey team and [contributors](https://github.com/yourusername/lowkey/graphs/contributors).

Special thanks to:
- [LLaMA.cpp](https://github.com/ggerganov/llama.cpp) for efficient LLM inference
- [Next.js](https://nextjs.org/) for the amazing framework
- The open-source AI community

---

<div align="center">
  
  **[⬆ Back to Top](#lowkey)**
  
  Made with ❤️ for privacy-conscious developers
  
  [Website](pext.org/lowkey)
  
</div>
```
