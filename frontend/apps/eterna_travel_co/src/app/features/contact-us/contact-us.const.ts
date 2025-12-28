import { FormOptions } from '@shared/data-access';
import { ContactCard } from './contact-us.model';

export const contactCards: ContactCard[] = [
  {
    key: 'features.contactUs.location',
    subtitle: '88 Ocean Dr, Miami, FL 33139, USA',
    iconClass: 'fa-solid fa-location-dot',
  },
  {
    key: 'features.contactUs.phone',
    subtitle: '+1 (213) 555-4820',
    iconClass: 'fa-solid fa-mobile-screen',
  },
  {
    key: 'features.contactUs.mail',
    subtitle: 'contact@eternatravelco.com',
    iconClass: 'fa-solid fa-envelope',
  },
];

export const contactUsFormOptions: FormOptions[] = [
  {
    label: 'core.label.name',
    placeholder: 'core.placeholder.name',
    formControlName: 'name',
    type: 'text',
  },
  {
    label: 'core.label.email',
    placeholder: 'core.placeholder.email',
    formControlName: 'email',
    type: 'text',
  },
  {
    label: 'core.label.message',
    placeholder: 'core.placeholder.message',
    formControlName: 'message',
    type: 'textarea',
  },
];
