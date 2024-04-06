import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowListElementComponent } from './show-list-element.component';

describe('ShowListElementComponent', () => {
  let component: ShowListElementComponent;
  let fixture: ComponentFixture<ShowListElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowListElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
