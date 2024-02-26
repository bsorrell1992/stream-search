import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamingServiceComponent } from './streaming-service.component';

describe('StreamingServiceComponent', () => {
  let component: StreamingServiceComponent;
  let fixture: ComponentFixture<StreamingServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StreamingServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StreamingServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
