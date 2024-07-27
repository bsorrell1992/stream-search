import { TestBed } from '@angular/core/testing';

import { MainViewControllerService } from './main-view-controller.service';

describe('MainViewControllerService', () => {
  let service: MainViewControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainViewControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
