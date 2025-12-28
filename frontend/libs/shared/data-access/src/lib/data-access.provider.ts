import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';

export function provideValue<T>(token: InjectionToken<T>, value: T): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: token,
      useValue: value,
    },
  ]);
}
