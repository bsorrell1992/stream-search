import { Injectable } from '@angular/core';
import { DisplayModes } from '../../constants/controller.constant';

@Injectable({
  providedIn: 'root'
})
export class MainViewControllerService {
  displayMode: DisplayModes = DisplayModes.Welcome;
  errorMsg: string = "";

  constructor() { }

  switchToError(errorMsg: string): void {
    this.displayMode = DisplayModes.Error;
    this.errorMsg = errorMsg;
  }

  switchToResults(): void {
    this.displayMode = DisplayModes.Results;
  }

  switchToShowsList(): void {
    this.displayMode = DisplayModes.ShowsList;
  }

  switchToWelcome(): void {
    this.displayMode = DisplayModes.Welcome;
  }
}
