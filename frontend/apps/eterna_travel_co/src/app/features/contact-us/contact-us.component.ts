import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from '@shared/ui';
import { Observable, of } from 'rxjs';
import { ContactCard, FormOptions, FormType } from './contact.model';

@Component({
  selector: 'et-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
  imports: [AsyncPipe, TranslatePipe, ButtonComponent],
})
export class ContactUsComponent {
  protected readonly contactCards$: Observable<ContactCard[]> = of([
    {
      key: 'features.contact-us.location',
      defaultText: 'Location',
      subtitle: '88 Ocean Dr, Miami, FL 33139, USA',
      iconClass: 'fa-solid fa-location-dot',
    },
    {
      key: 'features.contact-us.phone',
      defaultText: 'Phone Number',
      subtitle: '+1 (213) 555-4820',
      iconClass: 'fa-solid fa-mobile-screen',
    },
    {
      key: 'features.contact-us.mail',
      defaultText: 'E-mail Address',
      subtitle: 'contact@eternatravelco.com',
      iconClass: 'fa-solid fa-envelope',
    },
  ]);

  protected formOptions$: Observable<FormOptions[]> = of([
    {
      placeholderKey: 'core.firstname',
      formControlName: 'firstname',
      type: 'text',
    },
    {
      placeholderKey: 'core.email',
      formControlName: 'email',
      type: 'text',
    },
    {
      placeholderKey: 'core.message',
      formControlName: 'message',
      type: 'textarea',
    },
  ]);

  protected readonly FormType = FormType;
}
