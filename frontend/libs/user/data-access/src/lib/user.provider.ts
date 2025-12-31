import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core';
import { userInitializer } from './user.initializer';
import { UserService } from './user.service';
import { UserStore } from './user.store';

export function provideUser(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideAppInitializer(() => userInitializer(inject(UserService), inject(UserStore))),
  ]);
}
