import { getLoopbackAudioMediaStream } from './renderer.js';
import { initMain } from './main.js';

if (process.type === 'renderer') {
    module.exports.getLoopbackAudioMediaStream = getLoopbackAudioMediaStream;
} else {
    module.exports.initMain = initMain;
}
