import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { ACTIVE_CURRENCY, Currency } from '@currency/data-access';
import { ACTIVE_LANGUAGE, LanguageCode } from '@language/data-access';
import { TranslatePipe } from '@ngx-translate/core';
import { StorageService } from '@shared/util/services';
import { AuthenticationService } from '@user/data-access';
import { tap } from 'rxjs';
import { MenuType } from '../header.enum';
import { DropdownSelectorComponent } from './dropdown-selector/dropdown-selector.component';

@Component({
  selector: 'et-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  imports: [DropdownSelectorComponent, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  private readonly storageService = inject(StorageService);
  private readonly authenticationService = inject(AuthenticationService);

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

  protected logout(): void {
    this.authenticationService
      .logout()
      .pipe(tap((value) => console.log('Value -> ', value)))
      .subscribe();
  }
}
