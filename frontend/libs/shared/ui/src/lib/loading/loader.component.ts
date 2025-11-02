import { Component, inject, WritableSignal } from '@angular/core';
import { LoaderService } from '@shared/util/services';

@Component({
  selector: 'ui-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  private readonly loaderService = inject(LoaderService);

  protected readonly loader: WritableSignal<boolean | null> = this.loaderService.loader;
}
