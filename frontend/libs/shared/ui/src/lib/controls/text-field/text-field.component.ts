import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ControlFieldComponent } from '../control-field/control-field.component';
import { InputDirective } from '../directives/input.component';

@Component({
  selector: 'ui-text-field',
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss',
  imports: [TranslatePipe, ControlFieldComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextFieldComponent,
      multi: true,
    },
  ],
})
export class TextFieldComponent extends InputDirective {}
