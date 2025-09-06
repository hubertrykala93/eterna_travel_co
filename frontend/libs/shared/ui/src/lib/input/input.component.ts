import { Component, input, InputSignal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { IconPosition, InputSize, InputType } from './input.enum';

@Component({
  selector: 'ui-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  imports: [TranslatePipe],
})
export class InputComponent {
  public readonly type: InputSignal<InputType | string> = input<InputType | string>(InputType.TEXT);
  public readonly id: InputSignal<string> = input<string>('');
  public readonly size: InputSignal<InputSize | string> = input<InputSize | string>('');
  public readonly placeholderKey: InputSignal<string> = input<string>('');
  public readonly iconClass: InputSignal<string> = input<string>('');
  public readonly iconPosition: InputSignal<IconPosition | string> = input<IconPosition | string>(
    IconPosition.LEFT,
  );
  public readonly fullWidth: InputSignal<boolean> = input<boolean>(false);
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  protected readonly InputType = InputType;
  protected readonly IconPosition = IconPosition;
}
