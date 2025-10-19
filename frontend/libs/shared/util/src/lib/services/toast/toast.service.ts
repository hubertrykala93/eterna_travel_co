import { Injectable, signal } from '@angular/core';
import { ToastOptions } from './toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public readonly toast = signal<ToastOptions | null>(null);

  public open(toastOptions: ToastOptions): void {
    this.toast.set(toastOptions);

    setTimeout(() => {
      this.toast.set(null);
    }, 5500);
  }
}
