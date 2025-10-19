import { Component, input, InputSignal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonColor, ButtonSize, ButtonType, ButtonVariant } from './button.type';

@Component({
  selector: 'ui-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  imports: [TranslatePipe],
})
export class ButtonComponent {
  public readonly translateKey: InputSignal<string> = input.required<string>();
  public readonly defaultText: InputSignal<string> = input<string>('');

  public readonly type: InputSignal<ButtonType> = input<ButtonType>('submit');

  public readonly size: InputSignal<ButtonSize> = input<ButtonSize>('medium');
  public readonly color: InputSignal<ButtonColor> = input<ButtonColor>('secondary');
  public readonly variant: InputSignal<ButtonVariant> = input<ButtonVariant>('solid');

  public readonly disabled: InputSignal<boolean> = input<boolean>(false);
  public readonly fullWidth: InputSignal<boolean> = input<boolean>(false);
}
