import { FormGroup, Validators } from '@angular/forms';
import { forEachControl } from '../helpers/for-each-control';

export const fireValidation = (form: FormGroup): void => {
  for (const key in form.controls) {
    const control = form.controls[key];

    control.markAsTouched();
    control.updateValueAndValidity();
  }
};

export const resetForm = (form: FormGroup): void => {
  for (const key in form.controls) {
    const control = form.controls[key];

    const resetValue = typeof control.value === 'boolean' ? false : null;

    control.setValue(resetValue, { emitEvent: false });
    control.markAsPristine();
    control.markAsUntouched();
  }
};

export const clearValidators = (form: FormGroup, controlKeys: string[]): void =>
  forEachControl(form, controlKeys, (control) => {
    control.clearValidators();
    control.setValue(null, { emitEvent: false });
    control.updateValueAndValidity({ emitEvent: false });
  });

export const setOnlyRequired = (form: FormGroup, controlKeys: string[]): void =>
  forEachControl(form, controlKeys, (control) => {
    control.clearValidators();
    control.setValidators(Validators.required);
    control.updateValueAndValidity({ emitEvent: false });
  });
