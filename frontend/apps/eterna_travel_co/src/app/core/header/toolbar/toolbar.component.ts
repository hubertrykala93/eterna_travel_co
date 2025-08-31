import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ACTIVE_CURRENCY } from '@currency/data-access';
import { ACTIVE_LANGUAGE } from '@language/data-access';
import { TranslatePipe } from '@ngx-translate/core';
import { Currency, LanguageCode, MenuType } from '@shared/models';
import { StorageService } from '@shared/util';
import { DropdownSelectorComponent } from '../dropdown-selector/dropdown-selector.component';

@Component({
  selector: 'et-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  imports: [DropdownSelectorComponent, TranslatePipe],
})
export class ToolbarComponent {
  private readonly storageService = inject(StorageService);

  protected isCurrencyMenuOpen: WritableSignal<boolean> = signal<boolean>(false);
  protected isLanguageMenuOpen: WritableSignal<boolean> = signal<boolean>(false);

  protected selectedCurrency = this.storageService.getSignal<Currency>(
    ACTIVE_CURRENCY,
    Currency.USD,
  );
  protected selectedLanguage = this.storageService.getSignal<LanguageCode>(
    ACTIVE_LANGUAGE,
    LanguageCode.EN,
  );

  protected MenuType = MenuType;

  protected onCurrencyMenuOpen(): void {
    this.isCurrencyMenuOpen.set(!this.isCurrencyMenuOpen());
  }

  protected onLanguageMenuOpen(): void {
    this.isLanguageMenuOpen.set(!this.isLanguageMenuOpen());
  }

  protected onMenuClosed(): void {
    this.isLanguageMenuOpen.set(false);
  }
}
