import { Injectable } from '@angular/core';
import { StreamingService } from './models/streaming-service.model';
import { ShowListService } from './show-list.service';

@Injectable({
  providedIn: 'root'
})
export class ResultsListService {
  private _show: any = {};

  constructor(private showListService: ShowListService) { }

  setShow(id: string) {
    this._show = this.showListService.getShowById(id);
  }

  hasShow(): boolean {
    for (const prop in this._show) {
      if (Object.hasOwn(this._show, prop)) {
        return true;
      }
    }

    return false;
  }

  getStreamingOptions(): StreamingService[] {
    return this._show.streamingOptions;
  }

  getPoster(): string {
    return this._show.imageSet?.horizontalPoster.w1440 ?? this._show.imageSet?.verticalPoster.w1440 ?? '';
  }
}
