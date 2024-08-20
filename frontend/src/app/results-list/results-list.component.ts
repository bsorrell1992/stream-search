import { Component } from '@angular/core';
import { ResultsListElementComponent } from '../results-list-element/results-list-element.component';
import { NgFor, NgIf } from '@angular/common';
import { ShowListService } from '../show-list.service';
import { DisplayListService } from '../display-list.service';
import { ResultsListService } from '../results-list.service';
import { StreamingService } from '../models/streaming-service.model';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-results-list',
  standalone: true,
  imports: [ResultsListElementComponent, NgFor, NgIf],
  templateUrl: './results-list.component.html',
  styleUrl: './results-list.component.css'
})
export class ResultsListComponent {
  constructor(public showListService: ShowListService,
    public displayListService: DisplayListService,
    public resultsListService: ResultsListService,
    private route: ActivatedRoute) {
    route.queryParamMap.subscribe((params: ParamMap): void => {
      resultsListService.setShow(params.get('id'));
    });
  }

  get poster(): string {
    return this.resultsListService.getPoster();
  }

  get streamingOptions(): StreamingService[] | null {
    return this.resultsListService.getStreamingOptions();
  }
}
