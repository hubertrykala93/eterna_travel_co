import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,64}$/;

export const passwordValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const regex = RegExp(PASSWORD_PATTERN);
    const isValid = regex.test(value);

    return isValid ? null : { passwordWeak: true };
  };
};
