import { APP_INITIALIZER, Provider } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '@shared/util';
import { initializeApp } from './app.initializers';

export function provideAppInitializer(): Provider {
  return {
    provide: APP_INITIALIZER,
    useFactory: initializeApp,
    deps: [StorageService, TranslateService],
    multi: true,
  };
}
