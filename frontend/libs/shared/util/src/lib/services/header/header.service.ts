import { inject, Injectable } from '@angular/core';
import { Currency, DropDownSelectorButtonConfig, LanguageCode, MenuType } from '@shared/models';
import { map, Observable, of } from 'rxjs';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private readonly storageService = inject(StorageService);

  public getDropDownNavigationButtons(): Observable<DropDownSelectorButtonConfig[]> {
    return of([
      // Currency
      {
        defaultLabel: 'USD',
        value: Currency.USD,
        type: MenuType.CURRENCY,
      },
      {
        defaultLabel: 'EUR',
        value: Currency.EUR,
        type: MenuType.CURRENCY,
      },
      {
        defaultLabel: 'PLN',
        value: Currency.PLN,
        type: MenuType.CURRENCY,
      },
      {
        defaultLabel: 'GBP',
        value: Currency.GBP,
        type: MenuType.CURRENCY,
      },

      // Language
      {
        key: 'core.header.toolbar.language-en',
        defaultLabel: 'English (US)',
        value: LanguageCode.EN,
        iconUrl: 'assets/header/flags/en-flag.jpg',
        alt: 'United states flag',
        type: MenuType.LANGUAGE,
      },
      {
        key: 'core.header.toolbar.language-pl',
        defaultLabel: 'Polish (PL)',
        value: LanguageCode.PL,
        iconUrl: 'assets/header/flags/pl-flag.jpg',
        alt: 'Poland flag',
        type: MenuType.LANGUAGE,
      },

      // Main Menu
      {
        key: 'core.header.nav.home',
        defaultLabel: 'Home',
        link: '/',
        type: MenuType.MAIN,
      },
      {
        key: 'core.header.nav.about',
        defaultLabel: 'About',
        link: '/about',
        type: MenuType.MAIN,
      },
      {
        key: 'core.header.nav.tours',
        defaultLabel: 'Tours',
        link: '/tours',
        type: MenuType.MAIN,
      },
      {
        key: 'core.header.nav.destinations',
        defaultLabel: 'Destinations',
        link: '/destinations',
        type: MenuType.MAIN,
      },
      {
        key: 'core.header.nav.blog',
        defaultLabel: 'Blog',
        link: '/blog',
        type: MenuType.MAIN,
      },
      {
        key: 'core.header.nav.contact-us',
        defaultLabel: 'Contact Us',
        link: '/contact-us',
        type: MenuType.MAIN,
      },

      // Authentication Menu
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

  public getFilteredDropDownNavigationButtons(
    menuType: MenuType,
  ): Observable<DropDownSelectorButtonConfig[]> {
    return this.getDropDownNavigationButtons().pipe(
      map((buttons) => buttons.filter((button) => button.type === menuType)),
    );
  }
}
