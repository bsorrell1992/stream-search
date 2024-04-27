import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Countries } from './models/countries.model';
import { StreamingService } from './models/streaming-service.model';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  countries: Countries = {};

  constructor(public backendService: BackendService) {
    /*backendService.fetchCountries().then(
      (countries: Countries) => {
        this.countries = countries;
      },
      (error) => {
        console.error(error);
      }
    );*/
    this.countries = backendService.fetchCountries();
  }

  getServices(countryCode: string): {[streamingService: string]: StreamingService} {
    return this.countries[countryCode].services;
  }
}
