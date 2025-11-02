import { ToastStatus } from '../toast/toast.type';

export interface HttpErrorOptions {
  title: string;
  message: string;
  status: ToastStatus;
}
