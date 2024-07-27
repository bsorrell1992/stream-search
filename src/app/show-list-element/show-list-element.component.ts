import { Component, Input, Output, OnInit, SecurityContext, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-show-list-element',
  standalone: true,
  imports: [],
  templateUrl: './show-list-element.component.html',
  styleUrl: './show-list-element.component.css'
})
export class ShowListElementComponent implements OnInit {
  @Input() show: any;
  @Output() onSelect = new EventEmitter<any>();
  url: SafeResourceUrl | null = "";

  constructor(private domSanitizer: DomSanitizer) {}

  ngOnInit() {
  }

  clickHandler() {
    this.onSelect.emit(this.show);
  }
}
