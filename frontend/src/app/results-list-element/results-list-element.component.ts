import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-results-list-element',
  standalone: true,
  imports: [],
  templateUrl: './results-list-element.component.html',
  styleUrl: './results-list-element.component.css'
})
export class ResultsListElementComponent {
  @Input() streamingService: any;
}
