# study://

Focus. One session at a time.

## Dev Workflow

### Option 1: Watch Mode (Recommended)
Buka terminal, jalanin:
```bash
npm run dev:watch
```
Setiap lo save file, auto-rebuild. Tinggal reload extension di Chrome.

### Option 2: Preview UI
```bash
npm run dev
```
Buka `http://localhost:5173` buat liat UI (tanpa Chrome Extension).

### Reload Extension di Chrome
1. Edit code
2. `dist/` auto-updated (kalau pake watch)
3. Buka `chrome://extensions`
4. Klik refresh icon 🔄 di card study://
5. Tutup & buka ulang popup

## Build

```bash
npm run build
```

## Install as Chrome Extension

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the `dist` folder
5. Click the extension icon in Chrome toolbar

## Features

- **Duration picker**: 25m, 45m, 60m sessions
- **Task label**: What are you studying?
- **Background timer**: Timer tetap jalan walau popup ditutup
- **Notification**: Chrome notification pas session selesai
- **Apple Design**: SF Pro, glassmorphism, smooth animations

## Tech Stack

- React (JSX)
- Vite
- Tailwind CSS v4
- shadcn/ui components
- Lucide React icons
- Chrome Extension Manifest V3

## Structure

```
src/
├── components/
│   ├── ui/           # shadcn components
│   ├── DurationPicker.jsx
│   └── Timer.jsx
├── App.jsx
├── main.jsx
└── lib/utils.js

public/
├── manifest.json     # Chrome Extension manifest
└── background.js     # Service worker

dist/                 # Build output
```
