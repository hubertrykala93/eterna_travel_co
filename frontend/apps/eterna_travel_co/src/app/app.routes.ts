import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then((c) => c.AboutComponent),
  },
  {
    path: 'destinations',
    loadComponent: () =>
      import('./features/destinations/destinations.component').then((c) => c.DestinationsComponent),
    data: {
      showForm: true,
    },
  },
  {
    path: 'tours',
    loadComponent: () => import('./features/tours/tours.component').then((c) => c.ToursComponent),
    data: {
      showForm: true,
    },
  },
  {
    path: 'blog',
    loadComponent: () => import('./features/blog/blog.component').then((c) => c.BlogComponent),
  },
  {
    path: 'contact-us',
    loadComponent: () =>
      import('./features/contact-us/contact-us.component').then((c) => c.ContactUsComponent),
  },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./features/authentication/authentication.routes').then((m) => m.authenticationRoutes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
