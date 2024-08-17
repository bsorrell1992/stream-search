import { Routes } from '@angular/router';
import { ResultsListComponent } from './results-list/results-list.component';
import { ShowListComponent } from './show-list/show-list.component';
import { WelcomeViewComponent } from './welcome-view/welcome-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppContainerComponent } from './app-container/app-container.component';
import { resultsGuard } from './results.guard';
import { BadRequestComponent } from './bad-request/bad-request.component';
import { countryGuard } from './country.guard';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: 'home', component: AppContainerComponent, children: [
        {path: 'shows', component: ShowListComponent, canActivate: [countryGuard]},
        {path: 'results', component: ResultsListComponent, canActivate: [countryGuard, resultsGuard]},
        {path: '', pathMatch: 'full', component: WelcomeViewComponent, canActivate: [countryGuard]}
    ]},
    {path: 'bad-request', component: BadRequestComponent},
    {path: '**', component: PageNotFoundComponent}
];
