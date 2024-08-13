import { Injectable } from '@angular/core';
import { StreamingService } from './models/streaming-service.model';

@Injectable({
  providedIn: 'root'
})
export class ResultsListService {
  private _show: any = {};

  constructor() { }

  setShow(_show: any) {
    this._show = _show;
  }

  getStreamingOptions(): StreamingService[] {
    return this._show.streamingOptions;
  }

  getPoster(): string {
    return this._show.imageSet?.horizontalPoster.w1440 ?? this._show.imageSet?.verticalPoster.w1440 ?? '';
  }
}
