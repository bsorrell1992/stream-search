import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { ResultsListService } from './results-list.service';

export const resultsGuard: CanActivateFn = (): boolean | UrlTree => {
  return inject(ResultsListService).hasShow() ? true : inject(Router).createUrlTree(['']);
};
