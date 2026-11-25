import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'The Practice Zone',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home').then((module) => module.Home),
  },
  {
    path: 'text-modifier',
    title: 'Text Modifier',
    loadComponent: () =>
      import('./apps/text-modifier/text-modifier').then((module) => module.TextModifier),
  },
  {
    path: 'bookmarks',
    title: 'Bookmarks',
    loadComponent: () =>
      import('./apps/bookmarks/bookmarks').then((module) => module.Bookmarks),
  },
  { path: '**', redirectTo: '' },
];
