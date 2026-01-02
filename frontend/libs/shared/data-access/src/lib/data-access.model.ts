import { ToastStatus } from '@shared/util/services';
import { ControlType } from '@shared/util/types';

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
  type?: ControlType;
  visible?: boolean;
}

export interface APIResponse {
  title: string;
  message: string;
  status: ToastStatus;
  redirectUrl?: string;
}
