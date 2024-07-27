import { Component, Input } from '@angular/core';
import { ResultsListElementComponent } from '../results-list-element/results-list-element.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-results-list',
  standalone: true,
  imports: [ResultsListElementComponent, NgFor],
  templateUrl: './results-list.component.html',
  styleUrl: './results-list.component.css'
})
export class ResultsListComponent {
  @Input() show: any;
}
