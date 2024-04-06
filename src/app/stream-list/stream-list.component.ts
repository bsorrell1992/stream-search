import { Component } from '@angular/core';
import { StreamingServiceComponent } from '../streaming-service/streaming-service.component';
import { NgIf } from '@angular/common';
import { DisplayListService } from '../display-list.service';

@Component({
  selector: 'app-stream-list',
  standalone: true,
  imports: [StreamingServiceComponent, NgIf],
  templateUrl: './stream-list.component.html',
  styleUrl: './stream-list.component.css'
})
export class StreamListComponent {
  constructor(public displayListService: DisplayListService) { }
}
