import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Show } from '../models/shows.model';

@Component({
  selector: 'app-show-list-element',
  standalone: true,
  imports: [],
  templateUrl: './show-list-element.component.html',
  styleUrl: './show-list-element.component.css'
})
export class ShowListElementComponent {
  @Input({ required: true }) show!: Show;

  get showType(): string {
    let showType = this.show.showType;
    if (!showType) return '';

    return showType[0].toUpperCase() + showType.substring(1);
  }

  get date(): string {
    switch (this.show.showType) {
      case 'movie':
        return ' (' + this.show.releaseYear + ')';
      case 'series':
        return ' (' + this.show.firstAirYear + (this.show.lastAirYear !== this.show.firstAirYear ? '-' + this.show.lastAirYear : '') + ')';
    }
  }

  get title(): string {
    return this.show.title;
  }

  get cast(): string {
    const cast = this.show.cast;
    cast.sort();
    return cast.length > 0 ? cast.join(', ') : 'Cast information unavailable.';
  }

  get creatorsOrDirectors(): string {
    switch (this.show.showType) {
      case 'movie':
        return 'Directors';
      case 'series':
        return 'Creators';
    }
  }

  get creatorsOrDirectorsList(): string {
    switch (this.show.showType) {
      case 'movie':
        const directors = this.show.directors;
        directors.sort();
        return directors.length > 0 ? directors.join(', ') : 'Directors information unavailable.';
      case 'series':
        const creators = this.show.creators;
        creators.sort();
        return creators.length > 0 ? creators.join(', ') : 'Creators information unavailable.';
    }
  }

  get overview(): string {
    return this.show.overview !== '' ? this.show.overview : 'Description unavailable.';
  }

  get poster(): string {
    return this.show.imageSet.horizontalPoster.w1440 ?? this.show.imageSet.verticalPoster.w720;
  }
}
