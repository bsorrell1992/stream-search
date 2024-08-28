import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  showStreamSpinner = false;
  showCountriesSpinner = false;
  showSearchSpinner = false;

  constructor() { }
}
