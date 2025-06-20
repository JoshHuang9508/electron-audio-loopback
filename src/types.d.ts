import { SourcesOptions } from 'electron/main';

export interface InitMainOptions {
    sourcesOptions?: SourcesOptions;
    forceCoreAudioTap?: boolean;
}

export interface GetLoopbackAudioMediaStreamOptions {
    removeVideo?: boolean;
}
