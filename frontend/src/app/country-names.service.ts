import { Injectable } from '@angular/core';
import { CountryNames } from './models/countries.model';
import { BackendService } from './backend.service';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class CountryNamesService {
  countryNames: CountryNames | null = [];

  constructor(private backendService: BackendService,
    private spinnerService: SpinnerService
  ) {
    spinnerService.showCountriesSpinner = true;
    backendService.fetchCountries().subscribe(
      (countryNames: CountryNames | null): void => {
        this.countryNames = countryNames;
        spinnerService.showCountriesSpinner = false;
      }
    );
  }
}
