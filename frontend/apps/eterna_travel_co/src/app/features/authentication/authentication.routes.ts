import { Route } from '@angular/router';

export const authenticationRoutes: Route[] = [
  {
    path: 'login',
    loadComponent: () =>
      import('./authentication.component').then((c) => c.AuthenticationComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./authentication.component').then((c) => c.AuthenticationComponent),
  },
];
