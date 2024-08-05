import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsListElementComponent } from './results-list-element.component';

describe('ResultsListElementComponent', () => {
  let component: ResultsListElementComponent;
  let fixture: ComponentFixture<ResultsListElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsListElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultsListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
