interface ImageSet {
    lightThemeImage: string,
    darkThemeImage: string,
    whiteImage: string
};

export interface StreamingService {
    id: string,
    name: string,
    homePage: string,
    themeColorCode: string,
    imageSet: ImageSet
};

export type StreamingServices = StreamingService[];