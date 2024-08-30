import { StreamingOptions } from "./streaming-service.model";

interface ImageSet {
    horizontalPoster: {
        w360: string,
        w480: string,
        w720: string,
        w1080: string,
        w1440: string
    },
    verticalPoster: {
        w240: string,
        w360: string,
        w480: string,
        w600: string,
        w720: string
    }
};

interface BasicShow {
    cast: string[],
    id: string,
    imageSet: ImageSet,
    overview: string,
    showType: 'series' | 'movie',
    streamingOptions: StreamingOptions,
    title: string
}

export interface Series extends BasicShow {
    creators: string[],
    firstAirYear: number,
    lastAirYear: number,
    showType: 'series'
};

export interface Movie extends BasicShow {
    directors: string[],
    releaseYear: number,
    showType: 'movie'
};

export type Show = Series | Movie;

export type Shows = Show[];