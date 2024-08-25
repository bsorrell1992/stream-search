import { Routes } from '@angular/router';
import { resultsGuard } from './results.guard';
import { countryGuard } from './country.guard';
import { searchGuard } from './search.guard';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: 'home', loadComponent: () => import('./app-container/app-container.component').then(c => c.AppContainerComponent), children: [
        {path: 'shows', loadComponent: () => import('./show-list/show-list.component').then(c => c.ShowListComponent), canActivate: [countryGuard, searchGuard]},
        {path: 'results', loadComponent: () => import('./results-list/results-list.component').then(c => c.ResultsListComponent), canActivate: [countryGuard, resultsGuard]},
        {path: '', pathMatch: 'full', loadComponent: () => import('./welcome-view/welcome-view.component').then(c => c.WelcomeViewComponent)}
    ]},
    {path: 'bad-request', loadComponent: () => import('./bad-request/bad-request.component').then(c => c.BadRequestComponent)},
    {path: '**', loadComponent: () => import('./page-not-found/page-not-found.component').then(c => c.PageNotFoundComponent)}
];
