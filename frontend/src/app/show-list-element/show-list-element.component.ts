import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-show-list-element',
  standalone: true,
  imports: [],
  templateUrl: './show-list-element.component.html',
  styleUrl: './show-list-element.component.css'
})
export class ShowListElementComponent {
  @Input() show: any;
  @Output() onClick: EventEmitter<string> = new EventEmitter<string>();
}
