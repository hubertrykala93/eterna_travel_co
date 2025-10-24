import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ControlFieldComponent } from '../control-field/control-field.component';
import { InputDirective } from '../directives/input.directive';

@Component({
  selector: 'ui-textarea',
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  imports: [TranslatePipe, ControlFieldComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextareaComponent,
      multi: true,
    },
  ],
})
export class TextareaComponent extends InputDirective {
  public readonly fullHeight = input<boolean>();
}
