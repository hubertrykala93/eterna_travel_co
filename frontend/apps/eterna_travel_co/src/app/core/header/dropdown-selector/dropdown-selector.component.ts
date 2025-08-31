import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, input, InputSignal } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MenuType, NavigationButtonConfig } from '@shared/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'et-dropdown-selector',
  templateUrl: './dropdown-selector.component.html',
  styleUrl: './dropdown-selector.component.scss',
  imports: [AsyncPipe, TranslatePipe, CommonModule],
})
export class DropdownSelectorComponent {
  private readonly translateService = inject(TranslateService);

  public navigationButtonsConfig: InputSignal<Observable<NavigationButtonConfig[]>> =
    input.required<Observable<NavigationButtonConfig[]>>();

  protected onChange(button: NavigationButtonConfig): void {
    if (button.type === MenuType.LANGUAGE) {
      if (button.lang) {
        this.translateService.use(button.lang);
      }
    }
  }
}
