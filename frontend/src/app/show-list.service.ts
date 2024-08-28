import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class ShowListService {
  shows: any = [];
  country: string = "us";

  constructor(private backendService: BackendService,
    private spinnerService: SpinnerService
  ) { }

  searchForShow(input: {title: string, country: string}): void {
    this.spinnerService.showSearchSpinner = true;
    this.backendService.fetchShows(input).subscribe((shows) => {
      console.log(shows);
      this.shows = shows;
      this.country = input.country;
      this.spinnerService.showSearchSpinner = false;
    });
  }

  getShowById(id: string | null): any {
    const match = this.shows.filter((show: any): boolean => {
      return show.id === id;
    });

    return (match.length > 0) ? match[0] : null;
  }
}
