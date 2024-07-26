import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class ShowListService {
  shows: any = [];

  constructor(private backendService: BackendService) { }

  setShows(shows: any) { this.shows = shows; }

  resetShows() { this.shows = []; }

  searchForShow(input: {title: string, country: string}) {
    this.backendService.fetchShows(input);
  }
}
