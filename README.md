<p align="center">
  <picture>
    <img src="https://github.com/excepterr/azure-extensions/blob/main/icons/icon128.png?raw=true" style="border-radius: 50%; width: 128px;" />
  </picture>
</p>
<h3 align="center">
  Azure: Your Comprehensive Ad-Blocker and Privacy Guard
</h3>


<blockquote align="center">
Simple, free and efficient ad-blocker and privacy guard for Windows, macOS and Linux
</blockquote>

![GitHub License](https://img.shields.io/github/license/excepterr/azure-extensions)
![GitHub release](https://img.shields.io/github/v/release/excepterr/azure-extensions)
![GitHub download counter](https://img.shields.io/github/downloads/excepterr/azure-extensions/total)

A lightweight browser extension to remove ads and clutter from Microsoft Azure Portal, improving focus and performance.

## Downloads
### Chrome/Edge:
Download the latest .crx from [Releases](https://github.com/excepterr/azure-extensions/releases).
Go to chrome://extensions, enable Developer Mode, and drag/drop the file.

### Manual Build:
```bash
git clone https://github.com/excepterr/azure-extensions.git
cd azure-extensions
npm install
npm run build  # Outputs to /dist
```

## How It Works

- **DOM Manipulation**: Uses `MutationObserver` to detect and hide ad containers.
- **Selective Blocking**: Targets known Azure ad class names (e.g., `ms-PromoBanner`).
- **Lightweight**: No background scripts—runs only on Azure Portal URLs.

### Demo
<p align="center">
  <img src="https://github.com/excepterr/azure-extensions/blob/main/astra_demo.gif?raw=true" width="350" />
</p>

## License

This project is licensed under the [MIT License](https://github.com/excepterr/azure-extensions/blob/master/LICENSE). Some code and assets included with Zen are licensed under different terms. For more information, see the [COPYING](https://github.com/excepterr/azure-extensions/blob/master/COPYING.md) file.
