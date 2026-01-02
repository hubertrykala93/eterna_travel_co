import { AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

export const getErrorKey = (
  translateService: TranslateService,
  control: AbstractControl,
): string | void => {
  const [errorKey] = Object.keys(control.errors || {});
  const errorValue = control.errors?.[errorKey];

  if (!errorKey) {
    return;
  }

  const params = errorValue && typeof errorValue === 'object' ? errorValue : {};

  if (errorKey) {
    return translateService.instant(`core.validation.${errorKey}`, params);
  }
};
