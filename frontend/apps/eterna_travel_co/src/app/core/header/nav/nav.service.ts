import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DropdownButtonConfig, MenuType } from '../header.model';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  public getMainMenuNavigationButtons(): Observable<DropdownButtonConfig[]> {
    return of([
      {
        key: 'core.header.nav.home',
        defaultLabel: 'Home',
        link: '/',
        type: MenuType.NAV,
      },
      {
        key: 'core.header.nav.about',
        defaultLabel: 'About',
        link: '/about',
        type: MenuType.NAV,
      },
      {
        key: 'core.header.nav.tours',
        defaultLabel: 'Tours',
        link: '/tours',
        type: MenuType.NAV,
      },
      {
        key: 'core.header.nav.destinations',
        defaultLabel: 'Destinations',
        link: '/destinations',
        type: MenuType.NAV,
      },
      {
        key: 'core.header.nav.blog',
        defaultLabel: 'Blog',
        link: '/blog',
        type: MenuType.NAV,
      },
      {
        key: 'core.header.nav.contact-us',
        defaultLabel: 'Contact Us',
        link: '/contact-us',
        type: MenuType.NAV,
      },
    ]);
  }

  public getAuthMenuNavigationButtons(): Observable<DropdownButtonConfig[]> {
    return of([
      {
        key: 'core.header.middlebar.login',
        defaultLabel: 'Login',
        link: '/authentication/login',
        type: MenuType.AUTHENTICATION,
      },
      {
        key: 'core.header.middlebar.register',
        defaultLabel: 'Register',
        link: '/authentication/login',
        type: MenuType.AUTHENTICATION,
      },
    ]);
  }
}
