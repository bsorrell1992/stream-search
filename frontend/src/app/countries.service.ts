import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { StreamingService } from './models/streaming-service.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  constructor(public backendService: BackendService) {}

  getCountries(): Observable<{ countryCode: string, name: string}[]> {
    return this.backendService.fetchCountries();
  }

  getServices(countryCode: string): Observable<StreamingService[]> {
    return this.backendService.fetchStreamingServices(countryCode);
  }
}
