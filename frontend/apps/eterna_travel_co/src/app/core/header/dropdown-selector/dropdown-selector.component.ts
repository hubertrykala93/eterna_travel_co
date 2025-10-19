import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ACTIVE_CURRENCY, Currency } from '@currency/data-access';
import { ACTIVE_LANGUAGE, LanguageCode } from '@language/data-access';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { StorageService } from '@shared/util/services';
import { MenuType } from '../header.enum';
import { getFilteredDropDownNavigationButtons } from '../header.helper';
import { DropDownSelectorButtonConfig } from './../header.model';

@Component({
  selector: 'et-dropdown-selector',
  templateUrl: './dropdown-selector.component.html',
  styleUrl: './dropdown-selector.component.scss',
  imports: [TranslatePipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownSelectorComponent {
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

  protected readonly dropDownNavigationButtonsConfig = computed(() =>
    getFilteredDropDownNavigationButtons(this.menuType()),
  );

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
