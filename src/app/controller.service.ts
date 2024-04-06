import { Injectable } from '@angular/core';
import { DisplayModes } from '../../constants/controller.constant';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  currentView = DisplayModes.Welcome;
  shows: any = [];

  constructor(public backendService: BackendService) { }

  switchToWelcome() { this.currentView = DisplayModes.Welcome; }

  searchForShow(input: {title: string, country: string}) {
    this.backendService.fetchShows(input).then(
      (shows) => {
        this.shows = shows;
        this.currentView = DisplayModes.ShowsList;
      },
      (error) => {
        this.currentView = DisplayModes.Error;
        console.error(error);
      }
    );
  }
}
