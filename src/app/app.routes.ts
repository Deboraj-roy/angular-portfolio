import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'old_html'
  },
  {
    path: 'old_html',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'cv',
    loadComponent: () =>
      import('./pages/cv/cv.component').then((m) => m.CvComponent)
  },
  {
    path: '**',
    redirectTo: 'old_html'
  }
];
