import { getLoopbackAudioMediaStream } from './renderer.js';
import { initMain } from './main.js';

// TypeScript needs to know about all exports
export { getLoopbackAudioMediaStream, initMain };

// Runtime conditional export based on Electron context
if (process.type === 'renderer') {
    module.exports = { getLoopbackAudioMediaStream };
} else {
    module.exports = { initMain };
}
