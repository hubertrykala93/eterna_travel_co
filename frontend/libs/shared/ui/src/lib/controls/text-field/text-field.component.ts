import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'ui-text-field',
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss',
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFieldComponent extends InputComponent {}
