import { AsyncPipe } from '@angular/common';
import { Component, inject, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { ACTIVE_CURRENCY } from '@currency/data-access';
import { ACTIVE_LANGUAGE } from '@language/data-access';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Currency, DropDownSelectorButtonConfig, LanguageCode, MenuType } from '@shared/models';
import { HeaderService, StorageService } from '@shared/util/services';
import { defer, Observable } from 'rxjs';

@Component({
  selector: 'et-dropdown-selector',
  templateUrl: './dropdown-selector.component.html',
  styleUrl: './dropdown-selector.component.scss',
  imports: [AsyncPipe, TranslatePipe],
})
export class DropdownSelectorComponent {
  private readonly headerService = inject(HeaderService);
  private readonly storageService = inject(StorageService);
  private readonly translateService = inject(TranslateService);

  public menuType: InputSignal<MenuType> = input.required<MenuType>();

  public menuClosed: OutputEmitterRef<void> = output<void>();

  protected selectedCurrency = this.storageService.getSignal<Currency>(
    ACTIVE_CURRENCY,
    Currency.USD,
  );

  protected selectedLanguage = this.storageService.getSignal<LanguageCode>(
    ACTIVE_LANGUAGE,
    LanguageCode.EN,
  );

  protected readonly MenuType = MenuType;

  protected readonly dropdownNavigationButtonsConfig$: Observable<DropDownSelectorButtonConfig[]> =
    defer(() => this.headerService.getFilteredDropDownNavigationButtons(this.menuType()));

  protected onChange(button: DropDownSelectorButtonConfig): void {
    this.menuClosed.emit();

    if (!button.value) {
      return;
    }

    if (button.type === MenuType.LANGUAGE) {
      this.storageService.setItem(ACTIVE_LANGUAGE, button.value);
      this.translateService.use(button.value);
    } else {
      this.storageService.setItem(ACTIVE_CURRENCY, button.value);
    }
  }
}
