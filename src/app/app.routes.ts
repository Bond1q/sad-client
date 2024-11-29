import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'tariffs', loadComponent: () => import('./pages/tariffs/tariffs.component').then((m) => m.TariffsComponent) },
  { path: 'subscriptions', loadComponent: () => import('./pages/subscriptions/subscriptions.component').then((m) => m.SubscriptionsComponent) },
  { path: 'chat', loadComponent: () => import('./pages/chat-page/chat-page.component').then((m) => m.ChatPageComponent) },
  { path: 'account', loadComponent: () => import('./pages/account-page/account-page.component').then((m) => m.AccountPageComponent) },
  { path: '**', redirectTo: 'tariffs' },
];
