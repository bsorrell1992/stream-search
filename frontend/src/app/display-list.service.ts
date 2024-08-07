import { Injectable } from '@angular/core'; 
import { FormControl, FormGroup } from '@angular/forms';
import { CountriesService } from './countries.service';
import { Subject } from 'rxjs';
import { StreamingService } from './models/streaming-service.model';

@Injectable({
  providedIn: 'root'
})
export class DisplayListService {
  readonly defaultCountry: string = "us";

  private streamingServiceChecked: {[streamingServiceId: string]: boolean} = {};
  streamingServiceControls: FormGroup = new FormGroup({});
  streamingServiceDisplay: StreamingService[] = [];
  selectedCountryChange$: Subject<string> = new Subject<string>();

  constructor(public countriesService: CountriesService) {
    this.updateStreamingServices(this.defaultCountry);

    this.selectedCountryChange$.subscribe((selectedCountryCode: string): void => {
      this.updateStreamingServices(selectedCountryCode);
    })
  }

  getSelectedStreamingServices(): string[] {
    const controls = this.streamingServiceControls.controls;
    let selected: string[] = [];
    for (const control in controls) {
      if (controls[control].value) selected.push(control);
    }
    return selected;
  }

  updateStreamingServices(selectedCountryCode: string): void {
    this.updateChecked();
    
    this.updateControls(selectedCountryCode);
    this.updateDisplay(selectedCountryCode);
  }

  private updateChecked(): void {
    const controls = this.streamingServiceControls.controls;
    for (const control in controls) {
      this.streamingServiceChecked[control] = controls[control].value;
    }
  }

  private updateControls(selectedCountryCode: string): void {
    this.countriesService.getServices(selectedCountryCode).subscribe((streamingServices: StreamingService[]): void => {
      let streamingServiceControls: {
        [streamingServiceId: string]: FormControl
      } = {};
      for (const streamingService of streamingServices) {
        const id = streamingService.id;
        streamingServiceControls[id] = new FormControl(this.streamingServiceChecked[id] == true, {nonNullable: true});
      }
      this.streamingServiceControls = new FormGroup(streamingServiceControls);
    });
  }

  private updateDisplay(selectedCountryCode: string): void {
    this.countriesService.getServices(selectedCountryCode).subscribe((streamingServices: StreamingService[]): void => {
      this.streamingServiceDisplay = streamingServices;
    });
  }
}
