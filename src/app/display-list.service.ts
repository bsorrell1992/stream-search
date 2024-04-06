import { Injectable } from '@angular/core';
import { COUNTRIES } from '../../constants/countries.constant';

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

  constructor() { }

  updateDisplay(country: string) {
    let streamingServices = COUNTRIES[country];
    for (let service of Object.keys(this.display)) {
      this.display[service] = country.length === 0 || streamingServices.includes(service);
    }
  }
}
