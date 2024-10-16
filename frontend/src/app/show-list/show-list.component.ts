import { Component } from '@angular/core';
import { ShowListElementComponent } from '../show-list-element/show-list-element.component';
import { NgFor, NgIf } from '@angular/common';
import { ShowListService } from '../show-list.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ResultsListService } from '../results-list.service';
import { Shows } from '../models/shows.model';

@Component({
  selector: 'app-show-list',
  standalone: true,
  imports: [ShowListElementComponent, NgFor, NgIf],
  templateUrl: './show-list.component.html',
  styleUrl: './show-list.component.css'
})
export class ShowListComponent {
  constructor(public showListService: ShowListService,
    private resultsListService: ResultsListService,
    private router: Router,
    private route: ActivatedRoute) {
    route.queryParamMap.subscribe((params: ParamMap): void => {
      showListService.searchForShow({ title: params.get('search')!, country: params.get('country')! });
    });
  }

  protected updateView(showId: string): void {
    this.resultsListService.setShow(showId);
    this.router.navigate(['home', 'results'], { queryParams: {
      country: this.route.snapshot.queryParamMap.get('country'),
      id: showId
    }});
  }

  protected get showList(): Shows | null {
    return this.showListService.getFilteredShows();
  }
}
