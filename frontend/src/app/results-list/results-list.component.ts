import { Component, Input } from '@angular/core';
import { ResultsListElementComponent } from '../results-list-element/results-list-element.component';
import { NgFor } from '@angular/common';
import { ShowListService } from '../show-list.service';
import { DisplayListService } from '../display-list.service';
import { ResultsListService } from '../results-list.service';
import { StreamingService } from '../models/streaming-service.model';

@Component({
  selector: 'app-results-list',
  standalone: true,
  imports: [ResultsListElementComponent, NgFor],
  templateUrl: './results-list.component.html',
  styleUrl: './results-list.component.css'
})
export class ResultsListComponent {
  streamingOptions: StreamingService[] = [];

  constructor(public showListService: ShowListService,
    public displayListService: DisplayListService,
    public resultsListService: ResultsListService) {
      const selectedStreamingServices = this.displayListService.getSelectedStreamingServices();
      this.streamingOptions = this.resultsListService.getStreamingServices().filter((streamingService: any) => {
        return selectedStreamingServices.includes(streamingService.service.id);
      });
    }
}
