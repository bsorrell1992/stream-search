import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StreamListComponent } from './stream-list/stream-list.component';
import { InputBarComponent } from './input-bar/input-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StreamListComponent, InputBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'streamsearch';

  constructor() {}
}
