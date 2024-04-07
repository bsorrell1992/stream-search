import { Component } from '@angular/core';
import { ResultsViewComponent } from '../results-view/results-view.component';
import { NgFor, NgIf } from '@angular/common';
import { ControllerService } from '../controller.service';
import { DisplayModes } from '../../../constants/controller.constant';
import { ShowListElementComponent } from '../show-list-element/show-list-element.component';
import { ShowListService } from '../show-list.service';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [NgIf, NgFor, ResultsViewComponent, ShowListElementComponent],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css'
})
export class MainViewComponent {
  DisplayModesEnum = DisplayModes;

  constructor(public controllerService: ControllerService, public showListService: ShowListService) { }
}
