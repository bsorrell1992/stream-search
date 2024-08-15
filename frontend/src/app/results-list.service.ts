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

  hasShow(): boolean {
    return !this.objectIsEmpty(this._show);
  }

  getStreamingOptions(): StreamingService[] {
    return this._show.streamingOptions;
  }

  getPoster(): string {
    return this._show.imageSet?.horizontalPoster.w1440 ?? this._show.imageSet?.verticalPoster.w1440 ?? '';
  }

  private objectIsEmpty(object: {[prop: string]: any}): boolean {
    for (const prop in object) {
      if (Object.hasOwn(object, prop)) {
        return false;
      }
    }

    return true;
  }
}
