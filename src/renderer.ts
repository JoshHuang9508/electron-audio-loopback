import { ipcRenderer } from 'electron';
import { ipcEvents } from './config.js';
import { type GetLoopbackAudioMediaStreamOptions } from './types.js';

export const getLoopbackAudioMediaStream = async (options: GetLoopbackAudioMediaStreamOptions = {}): Promise<MediaStream> => {
    const { removeVideo = true } = options;

    await ipcRenderer.invoke(ipcEvents.enableLoopbackAudio);

    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });

    if (removeVideo) {
        const videoTracks = stream.getVideoTracks();

        videoTracks.forEach(track => {
            track.stop();
            stream.removeTrack(track);
        });
    }

    await ipcRenderer.invoke(ipcEvents.disableLoopbackAudio);

    return stream;
}
