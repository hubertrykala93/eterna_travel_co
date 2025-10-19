import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-error-message',
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorMessageComponent {
  public readonly errorMessage = input.required<string | null>();
}
