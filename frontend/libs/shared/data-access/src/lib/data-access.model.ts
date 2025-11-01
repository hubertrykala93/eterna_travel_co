import { InputType } from '@shared/util/types';

export interface AuditableDto {
  id?: string;
  creationTimestamp?: Date;
  modificationTimestamp?: Date;
}

export interface Environment {
  production: boolean;
  backendUrl: string;
}

export interface FormOptions {
  label: string;
  placeholder?: string;
  formControlName: string;
  type?: InputType;
  visible?: boolean;
}
