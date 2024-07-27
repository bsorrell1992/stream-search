import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DisplayModes } from '../../../constants/controller.constant';
import { ShowListElementComponent } from '../show-list-element/show-list-element.component';
import { ShowListService } from '../show-list.service';
import { ResultsListComponent } from '../results-list/results-list.component';
import { MainViewControllerService } from '../main-view-controller.service';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [NgIf, NgFor, ShowListElementComponent, ResultsListComponent],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css'
})
export class MainViewComponent {
  DisplayModesEnum = DisplayModes;
  protected currentShow: any;

  constructor(public showListService: ShowListService,
    public mainViewControllerService: MainViewControllerService) { }

  setShow(show: any): void {
    this.currentShow = show;
    this.mainViewControllerService.switchToResults();
  }
}
