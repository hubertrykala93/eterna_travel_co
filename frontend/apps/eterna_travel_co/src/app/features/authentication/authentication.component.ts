import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { APIResponse, FormOptions } from '@shared/data-access';
import { ButtonComponent, CheckboxComponent, TextFieldComponent } from '@shared/ui/controls';
import { ToastService } from '@shared/util/services';
import {
  clearValidators,
  emailValidator,
  fireValidation,
  passwordValidator,
  repasswordMatchValidator,
  resetForm,
  setOnlyRequired,
} from '@shared/util/validators';
import {
  ActivationRequest,
  AuthenticationService,
  UserDto,
  UserService,
  UserStore,
} from '@user/data-access';

import { EMPTY, filter, iif, map, Observable, switchMap, tap } from 'rxjs';
import { AuthenticationFormControls, AuthenticationMode } from './authentication.model';

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
export class AuthenticationComponent implements OnInit {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly userService = inject(UserService);
  private readonly userStore = inject(UserStore);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly toastService = inject(ToastService);
  private readonly translateService = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly _nonNullableFormBuilder = inject(NonNullableFormBuilder);

  protected readonly isLoginRoute = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.url.includes('login')),
    ),
    { initialValue: this.router.url.includes('login') },
  );

  protected readonly authenticationFormOptions: FormOptions[] = this.getAuthenticationFormOptions(
    this.isLoginRoute() ? 'login' : 'register',
  );

  protected form!: FormGroup<AuthenticationFormControls>;

  private readonly activateAccount$: Observable<APIResponse> =
    this.activatedRoute.queryParamMap.pipe(
      switchMap((queryParams) => {
        const uid = queryParams.get('uid');
        const token = queryParams.get('token');

        if (!uid || !token) return EMPTY;

        const activationRequest: ActivationRequest = {
          uid,
          token,
        };

        return this.userService.activate(activationRequest).pipe(
          tap((response: APIResponse) => {
            const { title, message, status } = response;

            this.toastService.open({
              title: this.translateService.instant(`core.toast.title.${title}`),
              message: this.translateService.instant(`core.toast.message.${message}`),
              status: status,
            });
          }),
        );
      }),
    );

  public ngOnInit(): void {
    this.buildForm(this.isLoginRoute() ? 'login' : 'register');

    this.activateAccount$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  protected loginOrRegister(): void {
    if (this.form.invalid) {
      fireValidation(this.form);

      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { isTermsAccepted, ...data } = this.form.getRawValue();

    iif(
      () => data.email === null,
      this.authenticationService.login(data).pipe(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        tap((user: UserDto) => {
          this.router.navigateByUrl('/');

          this.toastService.open({
            title: this.translateService.instant('core.toast.title.loginSuccessful'),
            message: this.translateService.instant('core.toast.message.successfullySignedIn'),
            status: 'success',
          });
        }),
        switchMap(() =>
          this.userService.getCurrentUser().pipe(tap((user) => this.userStore.setUser(user))),
        ),
      ),
      this.userService.register(data).pipe(
        tap(() => {
          resetForm(this.form);

          this.toastService.open({
            title: this.translateService.instant('core.toast.title.accountCreatedSuccessfully'),
            message: this.translateService.instant(
              'core.toast.message.checkYourInboxToVerifyAccount',
            ),
            status: 'success',
          });
        }),
      ),
    ).subscribe();
  }

  private getAuthenticationFormOptions(mode: AuthenticationMode): FormOptions[] {
    return [
      {
        label: 'core.label.username',
        placeholder: 'core.placeholder.username',
        formControlName: 'username',
        type: 'text',
        visible: mode === 'login' || mode === 'register',
      },
      {
        label: 'core.label.email',
        placeholder: 'core.placeholder.email',
        formControlName: 'email',
        type: 'text',
        visible: mode === 'register',
      },
      {
        label: 'core.label.password',
        placeholder: 'core.placeholder.password',
        formControlName: 'password',
        type: 'password',
        visible: mode === 'login' || mode === 'register',
      },
      {
        label: 'core.label.confirmPassword',
        placeholder: 'core.placeholder.confirmPassword',
        formControlName: 'repassword',
        type: 'password',
        visible: mode === 'register',
      },
      {
        label: 'core.label.termsAccepting',
        formControlName: 'isTermsAccepted',
        visible: mode === 'register',
      },
    ];
  }

  private buildForm(mode: AuthenticationMode): void {
    this.form = this._nonNullableFormBuilder.group<AuthenticationFormControls>({
      username: this._nonNullableFormBuilder.control<string>('', {
        validators: [Validators.required, Validators.minLength(8), Validators.maxLength(64)],
      }),
      email: this._nonNullableFormBuilder.control<string>('', {
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255),
          emailValidator(),
        ],
      }),
      password: this._nonNullableFormBuilder.control<string>('', {
        validators: [Validators.required, passwordValidator()],
      }),
      repassword: this._nonNullableFormBuilder.control<string>('', {
        validators: [Validators.required, repasswordMatchValidator()],
      }),
      isTermsAccepted: this._nonNullableFormBuilder.control<boolean>(false, {
        validators: [Validators.requiredTrue],
      }),
    });

    if (mode === 'login') {
      const controlsToRemove = ['email', 'repassword', 'isTermsAccepted'];
      const requiredOnlyControls = ['username', 'password'];

      clearValidators(this.form, controlsToRemove);
      setOnlyRequired(this.form, requiredOnlyControls);
    }
  }
}
