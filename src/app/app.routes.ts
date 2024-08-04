import { Routes } from '@angular/router';
import { ResultsListComponent } from './results-list/results-list.component';
import { ShowListComponent } from './show-list/show-list.component';
import { WelcomeViewComponent } from './welcome-view/welcome-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppContainerComponent } from './app-container/app-container.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: 'home', component: AppContainerComponent, children: [
        {path: 'shows', component: ShowListComponent},
        {path: 'results', component: ResultsListComponent},
        {path: '', pathMatch: 'full', component: WelcomeViewComponent}
    ]},
    {path: '**', component: PageNotFoundComponent}
];
