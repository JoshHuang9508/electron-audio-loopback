const { getLoopbackAudioMediaStream } = require('../dist/index.js');

document.addEventListener('DOMContentLoaded', async () => {
    const audioPlayer = document.getElementById('audio');
    const status = document.getElementById('status');

    try {
        const mediaStream = await getLoopbackAudioMediaStream();

        console.log('Audio stream obtained:', mediaStream);

        audioPlayer.srcObject = mediaStream;
        audioPlayer.play();

        status.textContent = 'Stream obtained! :3'
    } catch (error) {
        console.error('Error getting audio stream:', error);
        status.textContent = 'Error getting audio stream';
    }
});
