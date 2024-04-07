import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowListService {
  shows: any = [];

  constructor() { }

  setShows(shows: any) { this.shows = shows; }

  resetShows() { this.shows = []; }
}
