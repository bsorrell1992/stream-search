import { Component } from '@angular/core';
import { StreamListComponent } from '../stream-list/stream-list.component';
import { RouterOutlet } from '@angular/router';
import { InputBarComponent } from '../input-bar/input-bar.component';
import { SpinnerService } from '../spinner.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-app-container',
  standalone: true,
  imports: [RouterOutlet, StreamListComponent, InputBarComponent, NgIf],
  templateUrl: './app-container.component.html',
  styleUrl: './app-container.component.css'
})
export class AppContainerComponent {
  constructor(protected spinnerService: SpinnerService) { }

  get showSpinner(): boolean {
    return this.spinnerService.showCountriesSpinner ||
      this.spinnerService.showSearchSpinner ||
      this.spinnerService.showStreamSpinner;
  }
}
