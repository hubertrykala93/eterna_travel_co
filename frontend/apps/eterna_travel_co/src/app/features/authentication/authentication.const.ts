import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { FormOptions } from '@shared/data-access';
import { EmailValidator, ValidationUtil } from '@shared/util/validators';
import { AuthenticationFormControls } from './authentication.model';
import { AuthenticationMode } from './authentication.type';
import { AuthenticationValidator } from './authentication.validator';

export const authenticationFormOptions = (mode: AuthenticationMode): FormOptions[] => {
  return [
    {
      labelKey: 'core.label.username',
      placeholderKey: 'core.placeholder.username',
      formControlName: 'username',
      type: 'text',
      visible: mode === 'login' || mode === 'register',
    },
    {
      labelKey: 'core.label.email',
      placeholderKey: 'core.placeholder.email',
      formControlName: 'email',
      type: 'text',
      visible: mode === 'register',
    },
    {
      labelKey: 'core.label.password',
      placeholderKey: 'core.placeholder.password',
      formControlName: 'password',
      type: 'password',
      visible: mode === 'login' || mode === 'register',
    },
    {
      labelKey: 'core.label.confirmPassword',
      placeholderKey: 'core.placeholder.confirmPassword',
      formControlName: 'repassword',
      type: 'password',
      visible: mode === 'register',
    },
    {
      labelKey: 'core.label.termsAccepting',
      formControlName: 'isTermsAccepted',
      visible: mode === 'register',
    },
  ];
};

export const getAuthenticationFormGroup = (
  nonNullableFormBuilder: NonNullableFormBuilder,
  mode: AuthenticationMode,
): FormGroup<AuthenticationFormControls> => {
  const form = nonNullableFormBuilder.group<AuthenticationFormControls>({
    username: nonNullableFormBuilder.control<string>('', {
      validators: [Validators.required, Validators.minLength(8), Validators.maxLength(64)],
    }),
    email: nonNullableFormBuilder.control<string>('', {
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        EmailValidator.patternValidator(),
      ],
    }),
    password: nonNullableFormBuilder.control<string>('', {
      validators: [Validators.required, AuthenticationValidator.passwordValidator()],
    }),
    repassword: nonNullableFormBuilder.control<string>('', {
      validators: [Validators.required, AuthenticationValidator.repasswordMatchValidator()],
    }),
    isTermsAccepted: nonNullableFormBuilder.control<boolean>(false, {
      validators: [Validators.requiredTrue],
    }),
  });

  if (mode === 'login') {
    const controlsToRemove = ['email', 'repassword', 'isTermsAccepted'];
    const requiredOnlyControls = ['username', 'password'];

    ValidationUtil.clearValidators(form, controlsToRemove);
    ValidationUtil.setOnlyRequired(form, requiredOnlyControls);
  }

  return form;
};
