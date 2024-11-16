import { Injectable } from '@angular/core'; 
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { StreamingOptionData, StreamingOptions } from './models/streaming-service.model';
import { BackendService } from './backend.service';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class DisplayListService {
  readonly defaultCountry: string = "us";

  private streamingServiceChecked: {[streamingServiceId: string]: boolean} = {};
  streamingServiceControls: FormGroup = new FormGroup({});
  streamingServiceDisplay: StreamingOptionData[] | null = [];
  selectedCountryChange$: Subject<string> = new Subject<string>();

  constructor(private backendService: BackendService,
    private spinnerService: SpinnerService
  ) {
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
    this.spinnerService.showStreamSpinner = true;

    this.backendService.fetchStreamingOptions(selectedCountryCode).subscribe((streamingServices: StreamingOptionData[] | null): void => {
      let streamingServiceControls: {
        [streamingServiceId: string]: FormControl
      } = {};

      if (streamingServices !== null) {
        for (const streamingService of streamingServices) {
          const id = streamingService.id;
          streamingServiceControls[id] = new FormControl(this.streamingServiceChecked[id] == true, {nonNullable: true});
        }
      }
      
      this.streamingServiceControls = new FormGroup(streamingServiceControls);
      
      this.spinnerService.showStreamSpinner = false;
    });
  }

  private updateDisplay(selectedCountryCode: string): void {
    this.backendService.fetchStreamingOptions(selectedCountryCode).subscribe((streamingServices: StreamingOptionData[] | null): void => {
      this.streamingServiceDisplay = streamingServices;
    });
  }

  hasCheckedOptions(streamingOptions: StreamingOptions): boolean {
    const checkedOptions: string[] = this.getSelectedStreamingServices();
    for (const streamingOption of streamingOptions) {
      if (checkedOptions.includes(streamingOption.service.id)) return true;
    }

    return false;
  }

  private setAll(newValue: boolean) {
    const controls = this.streamingServiceControls.controls;
    for (const control in controls) {
      controls[control].setValue(newValue);
    }
  }

  selectAll() {
    this.setAll(true);
  }

  deselectAll() {
    this.setAll(false);
  }
}
