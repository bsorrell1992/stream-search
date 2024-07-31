import { Injectable } from '@angular/core'; 
import { FormControl, FormGroup } from '@angular/forms';
import { CountriesService } from './countries.service';
import { Subject } from 'rxjs';
import { StreamingService } from './models/streaming-service.model';

@Injectable({
  providedIn: 'root'
})
export class DisplayListService {
  private streamingServiceChecked: {[streamingServiceId: string]: boolean} = {};
  streamingServiceControls: FormGroup = new FormGroup({});
  streamingServiceDisplay: StreamingService[] = [];
  selectedCountryChange$: Subject<string> = new Subject<string>();

  constructor(public countriesService: CountriesService) {
    countriesService.countriesChange$.subscribe(() => {
      this.updateStreamingServices("us");
      countriesService.countriesChange$.unsubscribe();
    });

    this.selectedCountryChange$.subscribe((selectedCountryCode: string): void => {
      this.updateStreamingServices(selectedCountryCode);
    })
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
    const streamingServices: StreamingService[] = this.countriesService.getServices(selectedCountryCode);
    let streamingServiceControls: {
      [streamingServiceId: string]: FormControl
    } = {};
    for (const streamingService of streamingServices) {
      const id = streamingService.id;
      streamingServiceControls[id] = new FormControl(this.streamingServiceChecked[id] == true, {nonNullable: true});
    }
    this.streamingServiceControls = new FormGroup(streamingServiceControls);
  }

  private updateDisplay(selectedCountryCode: string): void {
    this.streamingServiceDisplay = this.countriesService.getServices(selectedCountryCode);
  }
}
