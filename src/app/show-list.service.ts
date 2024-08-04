import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class ShowListService {
  shows: any = [];
  country: string = "us";

  constructor(private backendService: BackendService) { }

  resetShows() { this.shows = []; }

  async searchForShow(input: {title: string, country: string}): Promise<boolean> {
    this.backendService.fetchShows(input).then((shows) => {
      this.shows = shows;
      this.country = input.country;
      return true;
    }).catch((error) => {
      console.log(error);
      return false;
    });

    return false;
  }
}
