import { Injectable } from '@angular/core';
import { StreamingService } from './models/streaming-service.model';
import { ShowListService } from './show-list.service';

@Injectable({
  providedIn: 'root'
})
export class ResultsListService {
  private _show: any = {};

  constructor(private showListService: ShowListService) { }

  set show(_show: any) {
    this._show = _show;
  }

  getStreamingServices(): StreamingService[] {
    return this._show.streamingOptions[this.showListService.country];
  }
}
