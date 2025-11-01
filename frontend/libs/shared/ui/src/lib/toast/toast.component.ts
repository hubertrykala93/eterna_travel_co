import { ChangeDetectionStrategy, Component, inject, WritableSignal } from '@angular/core';
import { ToastOptions, ToastService } from '@shared/util/services';

@Component({
  selector: 'ui-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  private readonly toastService = inject(ToastService);

  protected readonly toast: WritableSignal<ToastOptions | null> = this.toastService.toast;
}
