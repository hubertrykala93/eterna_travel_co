import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { initializeLocale } from '@shared/data-access';
import { StorageService } from '@shared/util/services';
import { ACTIVE_LANGUAGE } from './language.const';
import { LanguageCode } from './language.enum';

export const provideLanguage = (): EnvironmentProviders => {
  return makeEnvironmentProviders([
    provideAppInitializer(() => {
      const translateService = inject(TranslateService);

      initializeLocale(
        inject(StorageService),
        ACTIVE_LANGUAGE,
        LanguageCode.EN,
        (language: LanguageCode) => translateService.use(language),
      );
    }),
  ]);
};
