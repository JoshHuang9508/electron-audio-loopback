import { SourcesOptions, type DesktopCapturerSource, type Session } from 'electron/main';

export interface InitMainOptions {
    sourcesOptions?: SourcesOptions;
    onAfterGetSources?: (sources: DesktopCapturerSource[]) => DesktopCapturerSource[];
    forceCoreAudioTap?: boolean;
    loopbackWithMute?: boolean;
    sessionOverride?: Session;
}

export interface GetLoopbackAudioMediaStreamOptions {
    removeVideo?: boolean;
}
