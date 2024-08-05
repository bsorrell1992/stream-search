import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Countries, Country } from './models/countries.model';
import { StreamingService } from './models/streaming-service.model';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  countries: Countries = {};
  countriesChange$: Subject<Countries> = new Subject<Countries>();

  constructor(public backendService: BackendService) {
    this.countriesChange$.subscribe((countries: Countries) => {
      this.countries = countries;
    });

    backendService.fetchCountries().then((countries) => {
      this.countriesChange$.next(countries);
      this.countriesChange$.unsubscribe();
    }).catch((error) => {
      console.log(error);
    });
  }

  getCountries(): Country[] {
    let countriesArray: Country[] = Object.values(this.countries);
    countriesArray.sort(this.nameComparator);

    return countriesArray;
  }

  getServices(countryCode: string): StreamingService[] {
    let streamingServices = this.countries[countryCode].services;
    streamingServices.sort(this.nameComparator);
    return streamingServices;
  }

  private nameComparator(a: { name: string }, b: { name: string }): number {
    const aName = a.name,
      bName = b.name;
    if (aName < bName) return -1;
    else if (aName === bName) return 0;
    else return 1;
  }
}
