import { ToastStatus } from './toast.type';

export interface ToastOptions {
  title: string;
  message: string;
  status: ToastStatus;
}
