import { Injectable } from '@angular/core';
import { StreamingService } from './models/streaming-service.model';
import { ShowListService } from './show-list.service';
import { DisplayListService } from './display-list.service';
import { Show } from './models/shows.model';

@Injectable({
  providedIn: 'root'
})
export class ResultsListService {
  private _show: Show | null = null;

  constructor(private showListService: ShowListService,
    private displayListService: DisplayListService
  ) { }

  setShow(id: string | null): void {
    this._show = this.showListService.getShowById(id);
    console.log(this._show);
  }

  hasShow(): boolean {
    return this._show !== null;
  }

  getTitle(): string {
    return this._show?.title ?? '';
  }

  getStreamingOptions(): StreamingService[] | null {
    const selectedStreamingServices = this.displayListService.getSelectedStreamingServices();
    return this._show?.streamingOptions.filter((streamingService: any) => {
      return selectedStreamingServices.includes(streamingService.service.id);
    }) ?? null;
  }

  getPoster(): string {
    return this._show?.imageSet?.horizontalPoster.w1440 ?? this._show?.imageSet?.verticalPoster.w720 ?? '';
  }
}
