export interface ContactCard {
  key: string;
  defaultText: string;
  subtitle: string;
  iconClass: string;
}

export interface FormOptions {
  placeholderKey: string;
  formControlName: string;
  type: string;
}

export enum FormType {
  TEXT = 'text',
  TEXTAREA = 'textarea',
}
