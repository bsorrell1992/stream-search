import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { DisplayListService } from '../display-list.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-stream-list',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './stream-list.component.html',
  styleUrl: './stream-list.component.css'
})
export class StreamListComponent {
  constructor(public displayListService: DisplayListService) { }
}
