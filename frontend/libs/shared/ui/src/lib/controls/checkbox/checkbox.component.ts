import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlFieldComponent } from '../control-field/control-field.component';
import { FormControlBaseDirective } from '../directives/form-control-base.directive';

@Component({
  selector: 'ui-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  imports: [ControlFieldComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CheckboxComponent,
      multi: true,
    },
  ],
})
export class CheckboxComponent extends FormControlBaseDirective {}
