import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ControllerService } from '../controller.service';
import { DisplayModes } from '../../../constants/controller.constant';
import { ShowListElementComponent } from '../show-list-element/show-list-element.component';
import { ShowListService } from '../show-list.service';
import { ResultsListComponent } from '../results-list/results-list.component';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [NgIf, NgFor, ShowListElementComponent, ResultsListComponent],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css'
})
export class MainViewComponent {
  DisplayModesEnum = DisplayModes;

  constructor(public controllerService: ControllerService, public showListService: ShowListService) { }
}
