import { AsyncPipe } from '@angular/common';
import { Component, Input, Output, OnInit, SecurityContext, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-show-list-element',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './show-list-element.component.html',
  styleUrl: './show-list-element.component.css'
})
export class ShowListElementComponent {
  @Input() show: any;
  url: SafeResourceUrl | null = "";
  protected params$: Observable<ParamMap>;

  constructor(private domSanitizer: DomSanitizer, private route: ActivatedRoute) {
    this.params$ = route.queryParamMap;
  }
}
