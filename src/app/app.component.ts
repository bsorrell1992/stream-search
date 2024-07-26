import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StreamListComponent } from './stream-list/stream-list.component';
import { MainViewComponent } from './main-view/main-view.component';
import { InputBarComponent } from './input-bar/input-bar.component';
import { DisplayModes } from '../../constants/controller.constant';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StreamListComponent, MainViewComponent, InputBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'streamsearch';
  DisplayModesEnum = DisplayModes;
  displayMode = DisplayModes.Welcome;

  switchView(displayMode: DisplayModes) {
    this.displayMode = displayMode;
  }

  switchToShows() {
    this.switchView(this.DisplayModesEnum.ShowsList);
  }
}
