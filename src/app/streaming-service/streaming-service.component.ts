import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-streaming-service',
  standalone: true,
  imports: [],
  templateUrl: './streaming-service.component.html',
  styleUrl: './streaming-service.component.css'
})
export class StreamingServiceComponent {
  @Input() name!: String;
  @Input() value!: String;
  @Input() label!: String;
}
