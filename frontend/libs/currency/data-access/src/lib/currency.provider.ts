import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core';
import { StorageService } from '@shared/util/services';
import { initializeCurrency } from './currency.initializer';

export const provideCurrency = (): EnvironmentProviders => {
  return makeEnvironmentProviders([
    provideAppInitializer(() => initializeCurrency(inject(StorageService))),
  ]);
};
