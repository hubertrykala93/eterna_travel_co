import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core';
import { initializeLocale } from '@shared/data-access';
import { StorageService } from '@shared/util/services';
import { ACTIVE_CURRENCY } from './currency.const';
import { Currency } from './currency.enum';

export const provideCurrency = (): EnvironmentProviders => {
  return makeEnvironmentProviders([
    provideAppInitializer(() =>
      initializeLocale(inject(StorageService), ACTIVE_CURRENCY, Currency.USD),
    ),
  ]);
};
