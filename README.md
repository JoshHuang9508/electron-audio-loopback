# Electron Loopback Audio Plugin

An Electron plugin for enabling system audio loopback capture via `navigator.mediaDevices.getDisplayMedia` on macOS 12.3+ and Windows 10+.

## Installation

```bash
npm install electron-loopback-audio
```

## Usage

### Main Process Setup

```javascript
const { app } = require('electron');
const { setupMainProcess } = require('electron-loopback-audio');

// Setup the plugin in your main process
// before the app is ready
setupMainProcess();

app.whenReady().then(() => {
  // Your app initialization
});
```

### Renderer Process Usage

```javascript
const { enableLoopbackAudio } = require('electron-loopback-audio');

const enabled = enableLoopbackAudio();

if (!enabled) {
  throw new Error('Failed to enable loopback audio');
}

const stream = await navigator.mediaDevices.getDisplayMedia({
  video: false,
  audio: true,
});

// The stream will now include system audio
const audioTracks = stream.getAudioTracks();

console.log('Audio tracks:', audioTracks);

const disabled = disableLoopbackAudio();

if (!disabled) {
  throw new Error('Failed to disable loopback audio');
}
```

## API Reference

### Main Process Functions

- `setupMainProcess()`: Initialize the plugin in the main process
- `enableLoopbackAudio()`: Enable system audio loopback capture in the renderer process
- `disableLoopbackAudio()`: Disable system audio loopback capture in the renderer process

### IPC Handlers

The plugin registers these IPC handlers automatically:

- `enable-loopback-audio`: Enable loopback audio
- `disable-loopback-audio`: Disable loopback audio

## Requirements

- Electron >= 31.0.1
- macOS 12.3+ or Windows 10+

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Development mode with watch
npm run dev

# Lint code
npm run lint
```

### Project Structure

```
src/
└── index.ts          # Main entry point with Electron setup
```

## License

MIT 