import { Directive, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { getErrorKey } from '@shared/util/helpers';
import { DisplayErrorDirective } from '../display-error/display-error.directive';

@Directive({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormControlBaseDirective),
      multi: true,
    },
  ],
})
export class FormControlBaseDirective extends DisplayErrorDirective {
  public readonly labelKey = input<string>();
  public readonly id = input<string>();
  public readonly disabled = input<boolean>(false);

  protected onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;

    this.value.set(value);

    this.onChange(value);
  }

  protected onBlur(): void {
    this.onTouched();

    const control = this.formControl();

    if (!control) {
      return;
    }

    if (control.invalid && control.touched) {
      const message = getErrorKey(this.translateService, control);
      this.errorMessage.set(message ?? null);
    } else {
      this.errorMessage.set(null);
    }
  }
}
