import { FormControl } from '@angular/forms';
import { AuditableDto } from '@shared/models';

export interface ContactUsDto extends AuditableDto {
  name: string;
  email: string;
  message: string;
}

export interface ContactCard {
  key: string;
  subtitle: string;
  iconClass: string;
}

export interface ContactUsControls {
  name: FormControl<string>;
  email: FormControl<string>;
  message: FormControl<string>;
}
