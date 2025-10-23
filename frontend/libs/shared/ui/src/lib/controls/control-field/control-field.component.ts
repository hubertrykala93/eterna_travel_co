import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ErrorMessageComponent } from '../../error-message/error-message.component';

@Component({
  selector: 'ui-control-field',
  templateUrl: './control-field.component.html',
  styleUrl: './control-field.component.scss',
  imports: [ErrorMessageComponent, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlFieldComponent {
  public readonly labelKey = input<string>();
  public readonly id = input<string>();
  public readonly errorMessage = input<string>('');
  public readonly disabled = input<boolean>(false);
}
