import { Component, Output, EventEmitter } from '@angular/core';
import { DisplayListService } from '../display-list.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-bar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input-bar.component.html',
  styleUrl: './input-bar.component.css'
})
export class InputBarComponent {
  @Output() showResults = new EventEmitter<void>();
  showForm = new FormGroup({
    title: new FormControl('', {nonNullable: true}),
    country: new FormControl('', {nonNullable: true})
  })

  constructor(public displayListService: DisplayListService) { }

  onSubmit() {
    const formVals = this.showForm.value,
      titleVal = formVals.title,
      countryVal = formVals.country;
      this.showResults.emit();
    /*this.controllerService.searchForShow({
      title: titleVal ? titleVal : '',
      country: countryVal ? countryVal : 'us'
    });*/

  }
}
