import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesListElementComponent } from './countries-list-element.component';

describe('CountriesListElementComponent', () => {
  let component: CountriesListElementComponent;
  let fixture: ComponentFixture<CountriesListElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountriesListElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountriesListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
