import { Component } from '@angular/core';
import { StreamingServiceComponent } from '../streaming-service/streaming-service.component';

@Component({
  selector: 'app-stream-list',
  standalone: true,
  imports: [StreamingServiceComponent],
  templateUrl: './stream-list.component.html',
  styleUrl: './stream-list.component.css'
})
export class StreamListComponent {

}
