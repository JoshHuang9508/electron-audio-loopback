const { getLoopbackAudioStream } = require('../dist/index.js');

document.addEventListener('DOMContentLoaded', async () => {
    const audioPlayer = document.getElementById('audio');
    const status = document.getElementById('status');

    console.log('Preload script loaded');

    try {
        const mediaStream = await getLoopbackAudioStream();
        console.log('Audio stream obtained:', mediaStream);
        audioPlayer.srcObject = mediaStream;
        audioPlayer.play();
        status.textContent = 'Stream obtained! :3'
    } catch (error) {
        console.error('Error getting audio stream:', error);
        status.textContent = 'Error getting audio stream';
    }
});
