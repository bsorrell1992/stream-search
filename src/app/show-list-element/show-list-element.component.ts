import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ResultsListService } from '../results-list.service';

@Component({
  selector: 'app-show-list-element',
  standalone: true,
  imports: [],
  templateUrl: './show-list-element.component.html',
  styleUrl: './show-list-element.component.css'
})
export class ShowListElementComponent implements OnInit {
  @Input() show: any;
  url: SafeResourceUrl | null = "";

  constructor(public resultsListService: ResultsListService,
    private domSanitizer: DomSanitizer) {}

  ngOnInit() {
  }

  clickHandler() {
    this.resultsListService.setShow(this.show);
  }
}
