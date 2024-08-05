import { Component } from '@angular/core';
import { ShowListElementComponent } from '../show-list-element/show-list-element.component';
import { NgFor, NgIf } from '@angular/common';
import { ShowListService } from '../show-list.service';

@Component({
  selector: 'app-show-list',
  standalone: true,
  imports: [ShowListElementComponent, NgFor, NgIf],
  templateUrl: './show-list.component.html',
  styleUrl: './show-list.component.css'
})
export class ShowListComponent {
  constructor(public showListService: ShowListService) { }

  setShow(show: any): void {
    
  }
}
