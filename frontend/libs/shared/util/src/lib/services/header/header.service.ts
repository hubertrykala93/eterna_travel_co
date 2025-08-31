import { Injectable } from '@angular/core';
import { MenuType, NavigationButtonConfig } from '@shared/models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  public getMainMenuNavigationButtons(): Observable<NavigationButtonConfig[]> {
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

  public getAuthMenuNavigationButtons(): Observable<NavigationButtonConfig[]> {
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

  public getCurrencyMenuNavigationButtons(): Observable<NavigationButtonConfig[]> {
    return of([
      {
        defaultLabel: 'USD',
        type: MenuType.CURRENCY,
      },
      {
        defaultLabel: 'EUR',
        type: MenuType.CURRENCY,
      },
      {
        defaultLabel: 'PLN',
        type: MenuType.CURRENCY,
      },
      {
        defaultLabel: 'GBP',
        type: MenuType.CURRENCY,
      },
    ]);
  }

  public getLanguageMenuNavigationButtons(): Observable<NavigationButtonConfig[]> {
    return of([
      {
        key: 'core.header.toolbar.english-us',
        defaultLabel: 'English (US)',
        lang: 'en',
        iconUrl: 'assets/header/flags/united-states-flag.jpg',
        alt: 'United states flag',
        type: MenuType.LANGUAGE,
      },
      {
        key: 'core.header.toolbar.polish-pl',
        defaultLabel: 'Polish (PL)',
        lang: 'pl',
        iconUrl: 'assets/header/flags/poland-flag.jpg',
        alt: 'Poland flag',
        type: MenuType.LANGUAGE,
      },
    ]);
  }
}
