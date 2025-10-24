import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FormOptions } from '@shared/data-access';
import { ButtonComponent, CheckboxComponent, TextFieldComponent } from '@shared/ui/controls';
import { ValidationUtil } from '@shared/util/validators';
import { filter, map } from 'rxjs';
import { authenticationFormOptions, getAuthenticationFormGroup } from './authentication.const';
import { AuthenticationFormControls } from './authentication.model';

@Component({
  selector: 'et-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss',
  imports: [
    ButtonComponent,
    TextFieldComponent,
    TranslatePipe,
    RouterLink,
    ReactiveFormsModule,
    CheckboxComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticationComponent {
  private readonly router = inject(Router);
  private readonly _nonNullableFormBuilder = inject(NonNullableFormBuilder);

  protected readonly isLoginRoute = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.url.includes('login')),
    ),
    { initialValue: this.router.url.includes('login') },
  );

  protected readonly authenticationFormOptions: FormOptions[] = authenticationFormOptions(
    this.isLoginRoute() ? 'login' : 'register',
  );

  protected readonly form: FormGroup<AuthenticationFormControls> = getAuthenticationFormGroup(
    this._nonNullableFormBuilder,
    this.isLoginRoute() ? 'login' : 'register',
  );

  protected loginOrRegister(): void {
    if (this.form.invalid) {
      ValidationUtil.fireValidation(this.form);

      return;
    }
  }
}
