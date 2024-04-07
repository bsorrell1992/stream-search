import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultsListService {
  show: any = {};

  constructor() { }

  setShow(show: any) { this.show = show; }
}
