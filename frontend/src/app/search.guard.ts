import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const searchGuard: CanActivateFn = (route, state) => {
  const search = route.queryParamMap.get('search');
  return (search && search.trim.length > 0) ? true : inject(Router).createUrlTree(['bad-request']);
};
