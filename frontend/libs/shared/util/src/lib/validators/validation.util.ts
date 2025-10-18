import { FormGroup } from '@angular/forms';

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

      control.setValue('', { emitEvent: false });
      control.markAsPristine();
      control.markAsUntouched();
    }
  }
}
