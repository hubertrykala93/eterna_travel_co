import { Component, input, InputSignal } from '@angular/core';
import { IconPosition, InputType } from './input.enum';

@Component({
  selector: 'ui-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  public readonly type: InputSignal<InputType | string> = input<InputType | string>(InputType.TEXT);
  public readonly id: InputSignal<string> = input<string>('');
  public readonly placeholder: InputSignal<string> = input<string>('');
  public readonly iconName: InputSignal<string> = input<string>('');
  public readonly iconPosition: InputSignal<IconPosition | string> = input<IconPosition | string>(
    '',
  );

  protected readonly InputType = InputType;
  protected readonly IconPosition = IconPosition;
}
