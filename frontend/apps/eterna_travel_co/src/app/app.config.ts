import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuthentication } from '@authentication/data-access';
import { provideCurrency } from '@currency/data-access';
import { provideLanguage } from '@language/data-access';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  ENVIRONMENT,
  httpErrorInterceptor,
  loadingInterceptor,
  provideValue,
} from '@shared/data-access';
import { appRoutes } from './app.routes';
import { environment } from './environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([loadingInterceptor, httpErrorInterceptor])),
    provideValue(ENVIRONMENT, environment),
    provideAuthentication(),
    provideLanguage(),
    provideCurrency(),
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
