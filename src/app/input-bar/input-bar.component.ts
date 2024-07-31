import { Component, Output, EventEmitter } from '@angular/core';
import { NgFor } from '@angular/common';
import { DisplayListService } from '../display-list.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CountriesService } from '../countries.service';
import { ShowListService } from '../show-list.service';

@Component({
  selector: 'app-input-bar',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './input-bar.component.html',
  styleUrl: './input-bar.component.css'
})
export class InputBarComponent {
  showForm = new FormGroup({
    title: new FormControl('', {nonNullable: true}),
    country: new FormControl('', {nonNullable: true})
  });

  constructor(public countriesService: CountriesService,
    public displayListService: DisplayListService,
    public showListService: ShowListService) { }

  onChange(country: string) {
    this.displayListService.selectedCountryChange$.next(country);
  }

  onSubmit() {
    const formVals: Partial<{title: string, country: string}> = this.showForm.value,
      titleVal: string | undefined = formVals.title,
      countryVal: string | undefined = formVals.country;
    
    this.showListService.searchForShow({title: titleVal ? titleVal : '', country: countryVal ? countryVal : 'us'});
  }
}
