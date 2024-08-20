import { TestBed } from '@angular/core/testing';

import { CountryNamesService } from './country-names.service';

describe('CountryNamesService', () => {
  let service: CountryNamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryNamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
