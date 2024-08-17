import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { BackendService } from './backend.service';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CountryName, CountryNames } from './models/countries.model';

export const countryGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> | UrlTree => {
  const backendService = inject(BackendService),
    router = inject(Router);
    
  return backendService.fetchCountries().pipe(
    map(
      (countries: CountryNames): boolean | UrlTree => countries.filter(
          (country: CountryName): boolean => country.countryCode === route.queryParamMap.get('country')
        ).length === 0 ? router.createUrlTree(['bad-request']) : true
    )
  );
};
