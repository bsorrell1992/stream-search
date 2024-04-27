import { StreamingService } from "./streaming-service.model"

interface Country {
    countryCode: string,
    name: string,
    services: {
        [serviceId: string]: StreamingService
    }
};

export interface Countries {
    [countryCode: string]: Country
};