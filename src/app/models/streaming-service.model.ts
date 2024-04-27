export interface StreamingService {
    id: string,
    name: string,
    homePage: string,
    themeColorCode: string,
    images: {
        lightThemeImage: string,
        darkThemeImage: string,
        whiteImage: string
    }
};