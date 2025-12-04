import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('@features/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'detailed-report',
    loadComponent: () =>
      import('@features/detailed-report/detailed-report.page').then(
        (m) => m.DetailedReportPage
      ),
  },
  {
    path: 'asanas-list',
    loadComponent: () =>
      import('@features/asanas-list-details/asanas-list-details.page').then(
        (m) => m.AsanasListDetailsPage
      ),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'asanam/:asanamSequenceId',
    loadComponent: () =>
      import('./features/asanam/asanam.page').then((m) => m.AsanamPage),
  },
];
