# Electron Audio Loopback

An Electron plugin for capturing system audio loopback on macOS 12.3+, Windows 10+, and Linux without any third-party loopback drivers or dependencies.

## Installation

```bash
npm install electron-audio-loopback
```

## Usage

### Main Process Setup

```javascript
const { app } = require('electron');
const { initMain } = require('electron-audio-loopback');

// Initialize the plugin in your main process
// before the app is ready
initMain();

app.whenReady().then(() => {
  // Your app initialization
});
```

### Renderer Process Usage

```javascript
const { getLoopbackAudioMediaStream } = require('electron-audio-loopback');

// Get a MediaStream with system audio loopback
const stream = await getLoopbackAudioMediaStream();

// The stream contains only audio tracks
const audioTracks = stream.getAudioTracks();
console.log('Audio tracks:', audioTracks);

// Use the stream with an audio element or Web Audio API
const audioElement = document.getElementById('audio');
audioElement.srcObject = stream;
audioElement.play();
```

## API Reference

### Main Process Functions

- `initMain()`: Initialize the plugin in the main process. Must be called before the app is ready.

### Renderer Process Functions

- `getLoopbackAudioMediaStream()`: Returns a Promise that resolves to a `MediaStream` containing system audio loopback. Video tracks are automatically removed from the stream.

### IPC Handlers

The plugin registers these IPC handlers automatically:

- `enable-loopback-audio`: Enables system audio loopback capture
- `disable-loopback-audio`: Disables system audio loopback capture

## Requirements

- Electron >= 31.0.1
- macOS 12.3+, Windows 10+, most Linux distros

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

# Run example
npm test
```

### Project Structure

```
src/
├── index.ts          # Main entry point with conditional exports
├── main.ts           # Main process initialization
└── renderer.ts       # Renderer process functionality
```

## License

MIT 