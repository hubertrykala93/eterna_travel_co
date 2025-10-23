import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonColor, ButtonFontStyle, ButtonSize, ButtonType, ButtonVariant } from './button.type';

@Component({
  selector: 'ui-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  public readonly translateKey = input.required<string>();

  public readonly type = input<ButtonType>('submit');

  public readonly font = input<ButtonFontStyle>('light');
  public readonly size = input<ButtonSize>('medium');
  public readonly color = input<ButtonColor>('secondary');
  public readonly variant = input<ButtonVariant>('solid');

  public readonly disabled = input<boolean>(false);
  public readonly fullWidth = input<boolean>(false);
}
