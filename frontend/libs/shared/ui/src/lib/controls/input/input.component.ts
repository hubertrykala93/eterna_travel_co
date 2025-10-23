import { Directive, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getErrorKey } from '@shared/util/helpers';
import { InputType } from '@shared/util/types';
import { DisplayErrorDirective } from '../display-error/display-error.directive';
import { IconPosition } from './input.type';

@Directive({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent extends DisplayErrorDirective implements ControlValueAccessor {
  public readonly labelKey = input<string>();
  public readonly placeholderKey = input<string>();

  public readonly id = input<string>();
  public readonly type = input<InputType>('text');

  public readonly iconClass = input<string>();
  public readonly iconPosition = input<IconPosition>('left');

  public readonly fullWidth = input<boolean>();

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
