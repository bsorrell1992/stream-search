import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ShowTypeService {
  showTypeForm = new FormGroup({
    movie: new FormControl(true, { nonNullable: true }),
    series: new FormControl(true, { nonNullable: true })
  });

  isSelected(prop: 'movie' | 'series'): boolean {
    return this.showTypeForm.get(prop)!.value;
  }
}
