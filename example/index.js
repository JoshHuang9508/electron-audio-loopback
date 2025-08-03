const { app, BrowserWindow } = require('electron');
const path = require('path');
const { initMain: initSystemAudioLoopback } = require('../dist/index.js');

// initSystemAudioLoopback({
//     loopbackWithMute: true,
//     onAfterGetSources: (sources) => {
//         console.log('sources', sources);
//         return sources;
//     },
//     sessionOverride: app.defaultSession,
//     forceCoreAudioTap: true,
//     sourcesOptions: {
//         types: ['screen'],
//     },
// });

initSystemAudioLoopback();

app.whenReady().then(() => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 400,
        title: 'Example App',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
        },
    });

    mainWindow.loadFile('index.html');

    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.show();
    });

    app.on('activate', () => {
        mainWindow.show();
    });
});
