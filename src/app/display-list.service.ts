import { Injectable } from '@angular/core'; 
import { FormControl, FormGroup } from '@angular/forms';
import { CountriesService } from './countries.service';

@Injectable({
  providedIn: 'root'
})
export class DisplayListService {
  display: {
    [service: string]: boolean
  } = {
    all4: true,
    apple: true,
    britbox: true,
    crave: true,
    curiosity: true,
    disney: true,
    hbo: true,
    hotstar: true,
    hulu: true,
    iplayer: true,
    mubi: true,
    netflix: true,
    now: true,
    peacock: true,
    paramount: true,
    prime: true,
    showtime: true,
    stan: true,
    starz: true,
    wow: true,
    zee5: true
  };

  resultsStreams = new FormGroup({
    all4: new FormControl(false, {nonNullable: true}),
    apple: new FormControl(false, {nonNullable: true}),
    britbox: new FormControl(false, {nonNullable: true}),
    crave: new FormControl(false, {nonNullable: true}),
    curiosity: new FormControl(false, {nonNullable: true}),
    disney: new FormControl(false, {nonNullable: true}),
    hbo: new FormControl(false, {nonNullable: true}),
    hotstar: new FormControl(false, {nonNullable: true}),
    hulu: new FormControl(false, {nonNullable: true}),
    iplayer: new FormControl(false, {nonNullable: true}),
    mubi: new FormControl(false, {nonNullable: true}),
    netflix: new FormControl(false, {nonNullable: true}),
    now: new FormControl(false, {nonNullable: true}),
    peacock: new FormControl(false, {nonNullable: true}),
    paramount: new FormControl(false, {nonNullable: true}),
    prime: new FormControl(false, {nonNullable: true}),
    showtime: new FormControl(false, {nonNullable: true}),
    stan: new FormControl(false, {nonNullable: true}),
    starz: new FormControl(false, {nonNullable: true}),
    wow: new FormControl(false, {nonNullable: true}),
    zee5: new FormControl(false, {nonNullable: true})
  })

  constructor(public countriesService: CountriesService) { }

  updateDisplay(country: string) {
    let streamingServices = Object.keys(this.countriesService.getServices(country));
    for (let service of Object.keys(this.display)) {
      this.display[service] = country.length === 0 || streamingServices.includes(service);
    }
  }
}
