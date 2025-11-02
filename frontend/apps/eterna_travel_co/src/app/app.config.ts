import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  ENVIRONMENT,
  httpErrorInterceptor,
  loadingInterceptor,
  provideValue,
} from '@shared/data-access';
import { StorageService } from '@shared/util/services';
import { initializeApp } from './app.initializers';
import { appRoutes } from './app.routes';
import { environment } from './environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([loadingInterceptor, httpErrorInterceptor])),
    provideAppInitializer(() => initializeApp(inject(StorageService), inject(TranslateService))),
    provideValue(ENVIRONMENT, environment),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json',
      }),
      fallbackLang: 'en',
      lang: 'en',
    }),
  ],
};
