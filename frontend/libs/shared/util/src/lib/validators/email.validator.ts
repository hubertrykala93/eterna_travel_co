import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class EmailValidators {
  private static EMAIL_PATTERN =
    '^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,3}$';

  public static patternValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const regex = new RegExp(this.EMAIL_PATTERN);
      const isValid = regex.test(value);

      return isValid ? null : { invalidEmail: true };
    };
  }
}
