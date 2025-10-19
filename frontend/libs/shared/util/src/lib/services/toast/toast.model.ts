import { ToastStatus } from './toast.type';

export interface ToastOptions {
  titleKey: string;
  messageKey: string;
  status: ToastStatus;
}
