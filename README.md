# Window Fullscreen Copy Spoofer

A simple Tampermonkey userscript that spoofs window visibility, focus, fullscreen mode, and console detection on websites. It also enables text copying (even if the site blocks it). Always active—no toggles.

## Features
- Makes sites think you're always in the window and fullscreen (even if you tab out or exit).
- Allows selecting, copying, and right-clicking text.
- Works on all sites (edit `@match` in the script if needed).

## Installation
1. Install [Tampermonkey](https://www.tampermonkey.net/) extension in your browser (Chrome, Firefox, etc.).
2. Create a new script in Tampermonkey.
3. Copy-paste the code from `script.js` into it.
4. Save and refresh your page—it runs automatically.

## Usage
- Load any webpage.
- Try exiting fullscreen, tabbing out, or copying text—it should work without detection.
- Edit the script's `@match` line to limit to specific sites (e.g., `https://example.com/*`).

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.