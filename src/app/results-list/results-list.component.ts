import { Component } from '@angular/core';
import { ResultsListElementComponent } from '../results-list-element/results-list-element.component';
import { NgFor } from '@angular/common';
import { ResultsListService } from '../results-list.service';

@Component({
  selector: 'app-results-list',
  standalone: true,
  imports: [ResultsListElementComponent, NgFor],
  templateUrl: './results-list.component.html',
  styleUrl: './results-list.component.css'
})
export class ResultsListComponent {
  constructor(public resultsListService: ResultsListService) {}
}
