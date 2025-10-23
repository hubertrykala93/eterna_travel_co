import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { getErrorKey } from '@shared/util/helpers';
import { InputType } from '@shared/util/types';
import { ErrorMessageComponent } from '../../error-message/error-message.component';
import { DisplayErrorComponent } from '../display-error/display-error.component';
import { IconPosition, InputSize } from './input.type';

@Component({
  selector: 'ui-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  imports: [TranslatePipe, ErrorMessageComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent extends DisplayErrorComponent implements ControlValueAccessor {
  public readonly labelKey = input<string>();
  public readonly type = input<InputType>('text');
  public readonly id = input<string>();
  public readonly size = input<InputSize>('medium');
  public readonly placeholderKey = input<string>();
  public readonly iconClass = input<string>();
  public readonly iconPosition = input<IconPosition>('left');
  public readonly fullWidth = input<boolean>();
  public readonly fullHeight = input<boolean>();
  public readonly disabled = input<boolean>();

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
