import { Directive, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
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
}
