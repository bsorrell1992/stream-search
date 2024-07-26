import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { ShowListService } from './show-list.service';
import { ResultsListService } from './results-list.service';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  constructor(public backendService: BackendService, 
    public showListService: ShowListService,
    public resultsListService: ResultsListService) { }

  searchForShow(input: {title: string, country: string}) {
    this.backendService.fetchShows(input).then(
      (shows) => {
        this.showListService.setShows(shows); 
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
