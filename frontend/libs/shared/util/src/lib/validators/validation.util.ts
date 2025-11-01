import { AbstractControl, FormGroup, Validators } from '@angular/forms';

export class ValidationUtil {
  public static fireValidation(form: FormGroup): void {
    for (const key in form.controls) {
      const control = form.controls[key];

      control.markAsTouched();
      control.updateValueAndValidity();
    }
  }

  public static resetForm(form: FormGroup): void {
    for (const key in form.controls) {
      const control = form.controls[key];

      const resetValue = typeof control.value === 'boolean' ? false : null;

      control.setValue(resetValue, { emitEvent: false });
      control.markAsPristine();
      control.markAsUntouched();
    }
  }

  public static clearValidators(form: FormGroup, controlKeys: string[]): void {
    controlKeys
      .map((key) => form.get(key))
      .filter((control): control is AbstractControl => control instanceof AbstractControl)
      .forEach((control) => {
        control.clearValidators();
        control.setValue(null, { emitEvent: false });
        control.updateValueAndValidity({ emitEvent: false });
      });
  }

  public static setOnlyRequired(form: FormGroup, controlKeys: string[]): void {
    controlKeys
      .map((key) => form.get(key))
      .filter((control): control is AbstractControl => control instanceof AbstractControl)
      .forEach((control) => {
        control.clearValidators();
        control.setValidators(Validators.required);
        control.updateValueAndValidity({ emitEvent: false });
      });
  }
}
