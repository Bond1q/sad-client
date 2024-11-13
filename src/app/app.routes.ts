import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'tariffs', loadComponent: () => import('./pages/tariffs/tariffs.component').then((m) => m.TariffsComponent) },
  { path: 'subscriptions', loadComponent: () => import('./pages/subscriptions/subscriptions.component').then((m) => m.SubscriptionsComponent) },
];
