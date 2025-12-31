import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { APIResponse, FormOptions } from '@shared/data-access';
import { ButtonComponent, CheckboxComponent, TextFieldComponent } from '@shared/ui/controls';
import { ToastService } from '@shared/util/services';
import { ValidationUtil } from '@shared/util/validators';
import {
  ActivationRequest,
  AuthenticationService,
  UserDto,
  UserService,
  UserStore,
} from '@user/data-access';

import { EMPTY, filter, iif, map, Observable, switchMap, tap } from 'rxjs';
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

  protected readonly authenticationFormOptions: FormOptions[] = authenticationFormOptions(
    this.isLoginRoute() ? 'login' : 'register',
  );

  protected readonly form: FormGroup<AuthenticationFormControls> = getAuthenticationFormGroup(
    this._nonNullableFormBuilder,
    this.isLoginRoute() ? 'login' : 'register',
  );

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
    this.activateAccount$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  protected loginOrRegister(): void {
    if (this.form.invalid) {
      ValidationUtil.fireValidation(this.form);

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
          ValidationUtil.resetForm(this.form);

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
}
