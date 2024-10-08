import { StreamingOptionData } from "./streaming-service.model"

export interface Country {
    countryCode: string,
    name: string,
    services: StreamingOptionData[]
};

export interface Countries {
    [countryCode: string]: Country
};

export interface CountryName {
    countryCode: string,
    name: string
};

export type CountryNames = CountryName[];