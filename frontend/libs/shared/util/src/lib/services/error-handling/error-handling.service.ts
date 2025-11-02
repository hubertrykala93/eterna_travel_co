import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastOptions } from '../toast/toast.model';
import { ToastService } from '../toast/toast.service';
import { HttpErrorOptions } from './error-handling.model';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  private readonly toastService = inject(ToastService);
  private readonly translateService = inject(TranslateService);

  public handleHttpError(httpErrorOptions: HttpErrorOptions): void {
    const { title, message, status } = httpErrorOptions;

    const toastOptions: ToastOptions = {
      title: this.translateService.instant(`core.toast.title.${title}`),
      message: this.translateService.instant(`core.toast.message.${message}`),
      status: status,
    };

    this.toastService.open(toastOptions);
  }
}
