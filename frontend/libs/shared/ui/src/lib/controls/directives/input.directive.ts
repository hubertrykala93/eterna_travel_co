import { Directive, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlPosition, ControlType } from '@shared/util/types';
import { FormControlBaseDirective } from './form-control-base.directive';

@Directive({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDirective),
      multi: true,
    },
  ],
})
export class InputDirective extends FormControlBaseDirective {
  public readonly placeholder = input<string>();

  public readonly type = input<ControlType>('text');

  public readonly iconClass = input<string>();
  public readonly iconPosition = input<ControlPosition>('left');

  public readonly fullWidth = input<boolean>();
}
