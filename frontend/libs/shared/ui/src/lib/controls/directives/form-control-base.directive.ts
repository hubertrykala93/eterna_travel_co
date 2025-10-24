import { Directive, input } from '@angular/core';
import { getErrorKey } from '@shared/util/helpers';
import { DisplayErrorDirective } from './display-error.directive';

@Directive()
export class FormControlBaseDirective extends DisplayErrorDirective {
  public readonly labelKey = input<string>();
  public readonly id = input<string>();
  public readonly disabled = input<boolean>(false);

  protected onInput(event: Event): void {
    const element = event.target as HTMLInputElement;
    const value = element.type === 'checkbox' ? element.checked : element.value;

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
