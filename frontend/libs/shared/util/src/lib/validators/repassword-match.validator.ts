import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const repasswordMatchValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const repasswordControl = control;
    const parent = repasswordControl.parent;

    if (!parent) {
      return null;
    }

    const passwordControl = parent.get('password');

    if (!passwordControl) {
      return null;
    }

    const password = passwordControl.value;
    const repassword = repasswordControl.value;

    if (!repassword) {
      return null;
    }

    if (repassword !== password) {
      return { passwordsDontMatch: true };
    }

    return null;
  };
};
