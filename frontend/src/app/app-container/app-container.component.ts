import { Component } from '@angular/core';
import { StreamListComponent } from '../stream-list/stream-list.component';
import { RouterOutlet } from '@angular/router';
import { InputBarComponent } from '../input-bar/input-bar.component';

@Component({
  selector: 'app-app-container',
  standalone: true,
  imports: [RouterOutlet, StreamListComponent, InputBarComponent],
  templateUrl: './app-container.component.html',
  styleUrl: './app-container.component.css'
})
export class AppContainerComponent {

}
