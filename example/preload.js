const { getLoopbackAudioMediaStream } = require('../dist/index.js');

document.addEventListener('DOMContentLoaded', async () => {
    const audioPlayer = document.getElementById('audio');
    const status = document.getElementById('status');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = window.innerWidth - 25;
    canvas.height = 100;

    function drawVisualizer(ctx, analyser, dataArray, canvas) {
        requestAnimationFrame(() => drawVisualizer(ctx, analyser, dataArray, canvas));
    
        analyser.getByteFrequencyData(dataArray);
    
        ctx.fillStyle = '#f3f3f3';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    
        const bufferLength = analyser.frequencyBinCount;
        const barWidth = (canvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;
    
        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] / 2;
    
            const hue = (i / bufferLength) * 360;
            ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
    
            x += barWidth + 1;
        }
    }    

    try {
        const mediaStream = await getLoopbackAudioMediaStream();

        console.log('Audio stream obtained:', mediaStream);

        audioPlayer.srcObject = mediaStream;
        audioPlayer.play();
        audioPlayer.volume = 0;

        status.textContent = 'Stream obtained! :3'

        // Create WebAudio visualizer
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(mediaStream);
        const analyser = audioContext.createAnalyser();

        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        source.connect(analyser);

        drawVisualizer(ctx, analyser, dataArray, canvas);

    } catch (error) {
        console.error('Error getting audio stream:', error);
        status.textContent = 'Error getting audio stream';
    }
});
