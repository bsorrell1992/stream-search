import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DisplayListService } from '../display-list.service';
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ShowListService } from '../show-list.service';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { CountryNamesService } from '../country-names.service';

@Component({
  selector: 'app-input-bar',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, RouterLink],
  templateUrl: './input-bar.component.html',
  styleUrl: './input-bar.component.css'
})
export class InputBarComponent {
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

  constructor(protected countryNamesService: CountryNamesService,
    protected displayListService: DisplayListService,
    protected showListService: ShowListService,
    private route: ActivatedRoute) {
      route.queryParamMap.subscribe((params: ParamMap): void => {
        const countryParam = params.get('country');
        if (countryParam) {
          this.showForm.patchValue({ country: countryParam });
        }
      });
    }

  protected get title() {
    return this.showForm.controls['title'];
  }

  protected get country() {
    return this.showForm.controls['country'];
  }

  protected get countryNames() {
    return this.countryNamesService.countryNames;
  }

  protected onChange(country: string): void {
    this.displayListService.selectedCountryChange$.next(country);
  }

  protected noWhitespaceValidator(control: FormControl): ValidationErrors | null {
    return (control.value ?? '').trim().length ? null : { 'whitespace': true };
  }
}
