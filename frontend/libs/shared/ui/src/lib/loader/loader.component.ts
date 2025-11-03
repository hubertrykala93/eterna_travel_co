import { ChangeDetectionStrategy, Component, inject, WritableSignal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LoaderService } from '@shared/util/services';

@Component({
  selector: 'ui-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  private readonly loaderService = inject(LoaderService);

  protected readonly loader: WritableSignal<boolean | null> = this.loaderService.loader;
}
