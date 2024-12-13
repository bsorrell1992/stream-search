import { AfterViewInit, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { StreamListComponent } from '../stream-list/stream-list.component';
import { RouterOutlet } from '@angular/router';
import { InputBarComponent } from '../input-bar/input-bar.component';
import { SpinnerService } from '../spinner.service';
import { NgIf } from '@angular/common';
import { animate, state, style, transition, trigger, AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-app-container',
  standalone: true,
  imports: [RouterOutlet, StreamListComponent, InputBarComponent, NgIf],
  templateUrl: './app-container.component.html',
  styleUrl: './app-container.component.css',
  animations: [
    trigger('animateStreamList', [
      state(
        'true',
        style({
          height: '85%'
        })
      ),
      state(
        'false',
        style({
          height: '0'
        })
      ),
      state(
        'desktop',
        style({
          height: '100%'
        })
      ),
      transition('true <=> false', [animate('0.25s')]),
      transition('* <=> desktop', [animate('0s')])
    ]),
    trigger('animateButton', [
      state(
        'true',
        style({
          top: '10%'
        })
      ),
      state(
        'false',
        style({
          top: '95%'
        })
      ),
      transition('* => *', [animate('0.25s')])
    ])
  ]
})
export class AppContainerComponent implements OnInit {
  protected showStreamList: boolean = false;
  protected componentWidth!: number;
  protected isPaused: boolean = true;

  constructor(protected spinnerService: SpinnerService,
    private _elementRef: ElementRef
  ) {
    setTimeout(() => {
      this.isPaused = false;
    }, 100);
  }

  ngOnInit() {
    this.componentWidth = this._elementRef.nativeElement.offsetWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResizeHandler() {
    this.componentWidth = this._elementRef.nativeElement.offsetWidth;
  }

  get showSpinner(): boolean {
    return this.spinnerService.showCountriesSpinner ||
      this.spinnerService.showSearchSpinner ||
      this.spinnerService.showStreamSpinner;
  }

  handleClick() {
    this.showStreamList = !this.showStreamList;
  }

  displayOn(event: AnimationEvent) {
    if (event.toState) event.element.style.display = 'inline-block';
  }

  displayOff(event: AnimationEvent) {
    if (!event.toState) event.element.style.display = 'none';
  }
}
