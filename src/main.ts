import { app, session, desktopCapturer, ipcMain } from 'electron';
import { type DesktopCapturerSource } from 'electron/main';
import { buildFeatureFlags, ipcEvents, defaultSourcesOptions, featureSwitchKey } from './config.js';
import { type InitMainOptions } from './types.js';

export const initMain = (options: InitMainOptions = {}): void => {
    const {
        sourcesOptions = defaultSourcesOptions,
        forceCoreAudioTap = false,
    } = options;

    // Get other enabled features from the command line.
    const otherEnabledFeatures = app.commandLine.getSwitchValue(featureSwitchKey)?.split(',');

    // Remove the switch if it exists.
    if (app.commandLine.hasSwitch(featureSwitchKey)) {
        app.commandLine.removeSwitch(featureSwitchKey);
    }

    // Add the feature flags to the command line with any other user-enabled features concatenated.
    const currentFeatureFlags = buildFeatureFlags({
        otherEnabledFeatures,
        forceCoreAudioTap,
    });

    app.commandLine.appendSwitch(featureSwitchKey, currentFeatureFlags);

    // Handle the enable loopback audio event.
    ipcMain.handle(ipcEvents.enableLoopbackAudio, () => {
        session.defaultSession.setDisplayMediaRequestHandler(async (_, callback) => {
            let sources: DesktopCapturerSource[];

            try {
                sources = await desktopCapturer.getSources(sourcesOptions);
            } catch {
                throw new Error(`Failed to get sources for system audio loopback capture.`);
            }

            if (sources.length === 0) {
                throw new Error(`No sources found for system audio loopback capture.`);
            }

            callback({ video: sources[0], audio: 'loopback' });
        });
    });

    // Handle the disable loopback audio event.
    ipcMain.handle(ipcEvents.disableLoopbackAudio, () => {
        session.defaultSession.setDisplayMediaRequestHandler(null);
    });
}
