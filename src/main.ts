const { app, session, desktopCapturer, ipcMain } = require('electron');

module.exports = (): void => {
    app.commandLine.appendSwitch('enable-features', 'MacLoopbackAudioForScreenShare,MacSckSystemAudioLoopbackOverride');

    ipcMain.handle('enable-loopback-audio', () => {
        session.defaultSession.setDisplayMediaRequestHandler(async (_: any, callback: any) => {
            const sources = await desktopCapturer.getSources({ types: ['screen'] });
            callback({ video: sources[0], audio: 'loopback' });
        });    
    });

    ipcMain.handle('disable-loopback-audio', () => {
        session.defaultSession.setDisplayMediaRequestHandler(null);
    });
};