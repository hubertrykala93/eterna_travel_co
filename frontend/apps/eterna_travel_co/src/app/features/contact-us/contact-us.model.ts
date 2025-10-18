import { FormControl } from '@angular/forms';

export interface ContactCard {
  key: string;
  defaultText: string;
  subtitle: string;
  iconClass: string;
}

export interface ContactUsControls {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  message: FormControl<string | null>;
}
