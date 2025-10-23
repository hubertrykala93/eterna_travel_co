import { FormControl } from '@angular/forms';

export interface AuthenticationFormControls {
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  repassword: FormControl<string>;
  isTermsAccepted: FormControl<boolean>;
}
