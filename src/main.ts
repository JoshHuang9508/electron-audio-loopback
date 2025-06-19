import { app, session, desktopCapturer, ipcMain } from 'electron';

const requiredFeatureFlags = [
    // macOS-related
    'MacLoopbackAudioForScreenShare',
    'MacSckSystemAudioLoopbackOverride',
    // linux-related
    'PulseaudioLoopbackForScreenShare',
];

export const initMain = (): void => {
    app.commandLine.appendSwitch('enable-features', requiredFeatureFlags.join(','));

    ipcMain.handle('enable-loopback-audio', () => {
        session.defaultSession.setDisplayMediaRequestHandler(async (_, callback) => {
            const sources = await desktopCapturer.getSources({ types: ['screen'] });
            callback({ video: sources[0], audio: 'loopback' });
        });
    });

    ipcMain.handle('disable-loopback-audio', () => {
        session.defaultSession.setDisplayMediaRequestHandler(null);
    });
}
