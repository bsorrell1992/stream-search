interface ImageSet {
    darkThemeImage: string,
    lightThemeImage: string,
    whiteImage: string
};

export interface StreamingOptionData {
    homePage: string,
    id: string,
    imageSet: ImageSet,
    name: string,
    themeColorCode: string
};

export interface StreamingOption {
    addons?: StreamingOptionData[],
    link: string,
    service: StreamingOptionData,
    types: string[]
}

export type StreamingOptions = StreamingOption[];