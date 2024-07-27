import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { MainViewControllerService } from './main-view-controller.service';

@Injectable({
  providedIn: 'root'
})
export class ShowListService {
  shows: any = [];

  constructor(private backendService: BackendService,
    private mainViewControllerService: MainViewControllerService) { }

  resetShows() { this.shows = []; }

  searchForShow(input: {title: string, country: string}): void {
    this.backendService.fetchShows(input).then((shows) => {
      this.shows = shows;
      this.mainViewControllerService.switchToShowsList();
    }).catch((error) => {
      console.log(error);
    });
  }
}
