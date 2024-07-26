import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-countries-list-element',
  standalone: true,
  imports: [],
  templateUrl: './countries-list-element.component.html',
  styleUrl: './countries-list-element.component.css'
})
export class CountriesListElementComponent {
  @Input() code: string = '';
  @Input() name: string = '';
}
