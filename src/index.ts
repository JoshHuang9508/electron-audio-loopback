const getLoopbackAudioStream = require('./renderer.js');
const setupMainProcess = require('./main.js');

// @ts-ignore
if (process.type === 'renderer') {
    module.exports.getLoopbackAudioStream = getLoopbackAudioStream;
} else {
    module.exports.setupMainProcess = setupMainProcess;
}
