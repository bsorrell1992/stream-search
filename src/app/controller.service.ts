import { Injectable } from '@angular/core';
import { DisplayModes } from '../../constants/controller.constant';
import { BackendService } from './backend.service';
import { ShowListService } from './show-list.service';
import { ResultsListService } from './results-list.service';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  currentView = DisplayModes.Welcome;

  constructor(public backendService: BackendService, 
    public showListService: ShowListService,
    public resultsListService: ResultsListService) { }

  switchToWelcome() { this.currentView = DisplayModes.Welcome; }

  searchForShow(input: {title: string, country: string}) {
    this.backendService.fetchShows(input).then(
      (shows) => {
        this.showListService.setShows(shows); 
        this.currentView = DisplayModes.ShowsList;
      },
      (error) => {
        this.currentView = DisplayModes.Error;
        console.error(error);
      }
    );
  }

  showResults() { this.currentView = DisplayModes.Results; }
}
