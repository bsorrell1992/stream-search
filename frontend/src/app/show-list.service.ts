import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { SpinnerService } from './spinner.service';
import { Show, Shows } from './models/shows.model';

@Injectable({
  providedIn: 'root'
})
export class ShowListService {
  shows: Shows | null = [];
  country: string = "us";

  constructor(private backendService: BackendService,
    private spinnerService: SpinnerService
  ) { }

  searchForShow(input: { title: string, country: string }): void {
    this.spinnerService.showSearchSpinner = true;
    this.backendService.fetchShows(input).subscribe((shows) => {
      this.shows = shows;
      this.country = input.country;
      this.spinnerService.showSearchSpinner = false;
    });
  }

  getShowById(id: string | null): Show | null {
    const match = this.shows?.filter((show: any): boolean => {
      return show.id === id;
    });

    return (match && match.length > 0) ? match[0] : null;
  }
}
