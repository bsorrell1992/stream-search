import { Component, Input } from '@angular/core';
import { ResultsListElementComponent } from '../results-list-element/results-list-element.component';
import { NgFor } from '@angular/common';
import { ShowListService } from '../show-list.service';
import { DisplayListService } from '../display-list.service';

@Component({
  selector: 'app-results-list',
  standalone: true,
  imports: [ResultsListElementComponent, NgFor],
  templateUrl: './results-list.component.html',
  styleUrl: './results-list.component.css'
})
export class ResultsListComponent {
  @Input() show: any;

  constructor(public showListService: ShowListService, public displayListService: DisplayListService) { }

  ngOnInit() {
    const selectedStreamingServices = this.displayListService.getSelectedStreamingServices();
    this.show.streamingOptions[this.showListService.country] = this.show.streamingOptions[this.showListService.country].filter((streamingService: any) => {
      return selectedStreamingServices.includes(streamingService.service.id);
    });
  }
}
