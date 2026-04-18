import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'old_html'
  },
  {
    path: 'old_html',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: 'old_html'
  }
];
