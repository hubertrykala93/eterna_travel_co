import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@shared/ui/controls';

@Component({
  selector: 'et-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss',
  imports: [ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticationComponent {}
