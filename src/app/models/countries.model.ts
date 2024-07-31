import { StreamingService } from "./streaming-service.model"

export interface Country {
    countryCode: string,
    name: string,
    services: StreamingService[]
};

export interface Countries {
    [countryCode: string]: Country
};