import { ipcRenderer } from 'electron';

export const getLoopbackAudioMediaStream = async (): Promise<MediaStream> => {
    await ipcRenderer.invoke('enable-loopback-audio');

    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
    
    const videoTracks = stream.getVideoTracks();

    videoTracks.forEach(track => {
        track.stop();
        stream.removeTrack(track);
    });

    await ipcRenderer.invoke('disable-loopback-audio');
    
    return stream;
}
