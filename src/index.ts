import { app, session, desktopCapturer, ipcMain } from 'electron';

export const setupMainProcess: () => void = () => {
    app.commandLine.appendSwitch('enable-features', 'MacSckSystemAudioLoopbackOverride');
    ipcMain.handle('enable-loopback-audio', enableLoopbackAudio);
    ipcMain.handle('disable-loopback-audio', disableLoopbackAudio);
};

export const enableLoopbackAudio: () => void = () => {
    app.whenReady().then(() => {
        session.defaultSession.setDisplayMediaRequestHandler((_, callback) => {
            desktopCapturer.getSources({ types: ['screen'] }).then((sources) => {
                callback({ video: sources[0], audio: 'loopback' })
            })
        });
    });
}

export const disableLoopbackAudio: () => void = () => {
    app.whenReady().then(() => {
        session.defaultSession.setDisplayMediaRequestHandler(null);
    });
}
