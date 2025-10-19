import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { getErrorKey } from '@shared/util/helpers';
import { DisplayErrorComponent } from '../display-error/display-error.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { IconPosition, InputSize, InputType } from './input.enum';

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
  public readonly type = input<InputType | string>(InputType.TEXT);
  public readonly id = input<string>();
  public readonly size = input<InputSize | string>(InputSize.MEDIUM);
  public readonly placeholderKey = input<string>();
  public readonly iconClass = input<string>();
  public readonly iconPosition = input<IconPosition | string>(IconPosition.LEFT);
  public readonly fullWidth = input<boolean>();
  public readonly fullHeight = input<boolean>();
  public readonly disabled = input<boolean>();

  protected readonly InputType = InputType;
  protected readonly IconPosition = IconPosition;

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
