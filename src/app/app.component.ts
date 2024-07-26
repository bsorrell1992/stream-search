import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StreamListComponent } from './stream-list/stream-list.component';
import { MainViewComponent } from './main-view/main-view.component';
import { InputBarComponent } from './input-bar/input-bar.component';
import { DisplayModes } from '../../constants/controller.constant';
import { ShowListService } from './show-list.service';

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

  constructor(private showListService: ShowListService) {}

  protected searchForShow(data: {title: string, country: string}) {
    this.displayMode = this.DisplayModesEnum.ShowsList;

    this.showListService.searchForShow(data);
  }
}
