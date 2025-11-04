import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '@shared/util/services';
import { initializeLanguage } from './language.initializer';

export const provideLanguage = (): EnvironmentProviders => {
  return makeEnvironmentProviders([
    provideAppInitializer(() =>
      initializeLanguage(inject(StorageService), inject(TranslateService)),
    ),
  ]);
};
