import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core';
import { initializeAuth } from './authentication.initializer';
import { AuthenticationService } from './authentication.service';

export const provideAuthentication = (): EnvironmentProviders => {
  return makeEnvironmentProviders([
    provideAppInitializer(() => initializeAuth(inject(AuthenticationService))),
  ]);
};
