import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core';
import { initializeAuth } from './user.initializer';
import { UserService } from './user.service';

export const provideUser = (): EnvironmentProviders => {
  return makeEnvironmentProviders([
    provideAppInitializer(() => initializeAuth(inject(UserService))),
  ]);
};
