import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class AuthenticationValidator {
  public static readonly PASSWORD_PATTERN =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,64}$/;

  public static passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const regex = RegExp(this.PASSWORD_PATTERN);
      const isValid = regex.test(value);

      return isValid ? null : { passwordWeak: true };
    };
  }

  public static repasswordMatchValidator(): ValidatorFn {
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
  }
}
