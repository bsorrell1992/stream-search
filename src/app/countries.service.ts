import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Countries, Country } from './models/countries.model';
import { StreamingService } from './models/streaming-service.model';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  countries: Countries = {};

  constructor(public backendService: BackendService) {
    backendService.fetchCountries().then((countries) => {
      this.countries = countries;
    }).catch((error) => {
      console.log(error);
    });
  }

  getCountries(): Country[] {
    let countriesArray: Country[] = Object.values(this.countries);
    countriesArray.sort(function(a: Country, b: Country) {
      const aName = a.name, 
        bName = b.name;
      if (aName < bName) return -1;
      else if (aName === bName) return 0;
      else return 1;
    });

    return countriesArray;
  }

  getServices(countryCode: string): {[streamingService: string]: StreamingService} {
    return this.countries[countryCode].services;
  }
}
