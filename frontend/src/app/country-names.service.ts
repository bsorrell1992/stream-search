import { Injectable } from '@angular/core';
import { CountryNames } from './models/countries.model';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class CountryNamesService {
  countryNames: CountryNames | null = [];

  constructor(private backendService: BackendService) {
    backendService.fetchCountries().subscribe(
      (countryNames: CountryNames | null): void => {
        this.countryNames = countryNames;
      }
    );
  }
}
