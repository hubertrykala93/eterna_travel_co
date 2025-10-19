import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonColor, ButtonSize, ButtonType, ButtonVariant } from './button.enum';

@Component({
  selector: 'ui-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  public readonly translateKey: InputSignal<string> = input.required<string>();

  public readonly type: InputSignal<ButtonType | string> = input<ButtonType | string>(
    ButtonType.SUBMIT,
  );

  public readonly size: InputSignal<ButtonSize | string> = input<ButtonSize | string>(
    ButtonSize.MEDIUM,
  );
  public readonly color: InputSignal<ButtonColor | string> = input<ButtonColor | string>(
    ButtonColor.SECONDARY,
  );
  public readonly variant: InputSignal<ButtonVariant | string> = input<ButtonVariant | string>(
    ButtonVariant.SOLID,
  );

  public readonly disabled: InputSignal<boolean> = input<boolean>(false);
  public readonly fullWidth: InputSignal<boolean> = input<boolean>(false);

  protected readonly ButtonColor = ButtonColor;
  protected readonly ButtonSize = ButtonSize;
  protected readonly ButtonVariant = ButtonVariant;
}
