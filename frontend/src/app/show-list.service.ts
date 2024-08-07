import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowListService {
  shows: any = [];
  country: string = "us";
  showObservable$: Subject<any> = new Subject<any>();

  constructor(private backendService: BackendService) { }

  searchForShow(input: {title: string, country: string}): void {
    this.backendService.fetchShows(input).subscribe((shows) => {
      this.shows = shows;
      this.country = input.country;
    });
  }
}
