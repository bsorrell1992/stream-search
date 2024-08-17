import { Component } from '@angular/core';
import { ShowListElementComponent } from '../show-list-element/show-list-element.component';
import { NgFor, NgIf } from '@angular/common';
import { ShowListService } from '../show-list.service';
import { ResultsListService } from '../results-list.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-show-list',
  standalone: true,
  imports: [ShowListElementComponent, NgFor, NgIf],
  templateUrl: './show-list.component.html',
  styleUrl: './show-list.component.css'
})
export class ShowListComponent {
  protected params$: Observable<ParamMap>;

  constructor(public showListService: ShowListService, private route: ActivatedRoute) {
    this.params$ = route.queryParamMap;
    this.params$.subscribe((params: ParamMap): void => {
      showListService.searchForShow({ title: params.get('search')!, country: params.get('country')! });
    });
  }
}
