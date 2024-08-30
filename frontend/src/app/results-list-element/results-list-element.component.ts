import { Component, Input } from '@angular/core';
import { StreamingOption, StreamingOptionData } from '../models/streaming-service.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-results-list-element',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './results-list-element.component.html',
  styleUrl: './results-list-element.component.css'
})
export class ResultsListElementComponent {
  @Input() streamingService!: StreamingOption;

  protected get addons(): StreamingOptionData[] {
    return this.streamingService.addons!;
  }

  protected get optionTypes(): string[] {
    return this.streamingService.types.map((type: string): string => {
      return type[0].toUpperCase() + type.substring(1) + (type === 'addon' ? 's' : '');
    });
  }
}
