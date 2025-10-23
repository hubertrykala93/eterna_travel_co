import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthenticationFormControls } from './authentication.model';

export const getAuthenticationFormGroup = (
  nonNullableFormBuilder: NonNullableFormBuilder,
): FormGroup<AuthenticationFormControls> => {
  return nonNullableFormBuilder.group<AuthenticationFormControls>({
    username: nonNullableFormBuilder.control<string>('', {
      validators: Validators.required,
    }),
    email: nonNullableFormBuilder.control<string>('', {
      validators: Validators.required,
    }),
    password: nonNullableFormBuilder.control<string>('', {
      validators: Validators.required,
    }),
    repassword: nonNullableFormBuilder.control<string>('', {
      validators: Validators.required,
    }),
    isTermsAccepted: nonNullableFormBuilder.control<boolean>(false, {
      validators: Validators.requiredTrue,
    }),
  });
};
