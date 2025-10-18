import { FormOptions } from '@shared/models';
import { ContactCard } from './contact-us.model';

export const contactCards: ContactCard[] = [
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
];

export const formOptions: FormOptions[] = [
  {
    placeholderKey: 'core.name',
    formControlName: 'name',
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
];
