import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '@authentication/data-access';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FormOptions } from '@shared/data-access';
import { ButtonComponent, CheckboxComponent, TextFieldComponent } from '@shared/ui/controls';
import { ToastService } from '@shared/util/services';
import { ValidationUtil } from '@shared/util/validators';
import { filter, map, tap } from 'rxjs';
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
  private readonly authenticationService = inject(AuthenticationService);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);
  private readonly translateService = inject(TranslateService);
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

    const { repassword, isTermsAccepted, ...data } = this.form.getRawValue();

    this.authenticationService
      .createUser(data)
      .pipe(
        tap((user) => {
          console.log('User -> ', user);
          ValidationUtil.resetForm(this.form);

          this.toastService.open({
            title: this.translateService.instant('core.toast.title.accountCreatedSuccessfully'),
            message: this.translateService.instant(
              'core.toast.message.checkYourInboxToVerifyAccount',
            ),
            status: 'success',
          });
        }),
      )
      .subscribe();
  }
}
