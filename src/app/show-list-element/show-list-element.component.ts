import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ControllerService } from '../controller.service';
import { DisplayModes } from '../../../constants/controller.constant';

@Component({
  selector: 'app-show-list-element',
  standalone: true,
  imports: [],
  templateUrl: './show-list-element.component.html',
  styleUrl: './show-list-element.component.css'
})
export class ShowListElementComponent implements OnInit {
  @Input() show: any;
  url: SafeResourceUrl | null = "";

  constructor(public controllerService: ControllerService, private domSanitizer: DomSanitizer) {}

  ngOnInit() {
  }

  public clickHandler = () => {
    this.controllerService.currentView = DisplayModes.Results;
  }
}
