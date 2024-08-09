import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DisplayListService } from '../display-list.service';
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ShowListService } from '../show-list.service';
import { RouterLink } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-input-bar',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, RouterLink],
  templateUrl: './input-bar.component.html',
  styleUrl: './input-bar.component.css'
})
export class InputBarComponent {
  countryNames: { countryCode: string, name: string }[] = [];

  showForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        this.noWhitespaceValidator
      ]
    }),
    country: new FormControl(this.displayListService.defaultCountry, { nonNullable: true })
  });

  constructor(public backendService: BackendService,
    public displayListService: DisplayListService,
    public showListService: ShowListService) {
      backendService.fetchCountries().subscribe((countryNames: { countryCode: string, name: string }[]): void => {
        this.countryNames = countryNames;
      });
    }

  protected get title() {
    return this.showForm.controls['title'];
  }

  protected get country() {
    return this.showForm.controls['country'];
  }

  protected onChange(country: string): void {
    this.displayListService.selectedCountryChange$.next(country);
  }

  protected onSubmit(): void {
    this.showListService.searchForShow({title: this.title.value, country: this.country.value});
  }

  protected noWhitespaceValidator(control: FormControl): ValidationErrors | null {
    return (control.value ?? '').trim().length ? null : { 'whitespace': true };
  }
}
