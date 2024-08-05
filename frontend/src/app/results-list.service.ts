import { Injectable } from '@angular/core';
import { StreamingService } from './models/streaming-service.model';
import { DisplayListService } from './display-list.service';

@Injectable({
  providedIn: 'root'
})
export class ResultsListService {
  private country: string = "us";
  show: any = {};

  constructor(private displayListService: DisplayListService) {
    displayListService.selectedCountryChange$.subscribe((country: string): void => {
      this.country = country;
    });
  }

  getStreamingServices(): StreamingService[] {
    return this.show.streamingOptions[this.country];
  }
}
