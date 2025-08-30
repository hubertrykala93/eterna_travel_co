import { Component, signal, WritableSignal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DropdownSelectorComponent } from '../dropdown-selector/dropdown-selector.component';
import { DropdownButtonConfig, MenuType } from '../header.model';

@Component({
  selector: 'et-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  imports: [DropdownSelectorComponent],
})
export class ToolbarComponent {
  protected isMenuOpen: WritableSignal<boolean> = signal<boolean>(false);
  protected isSecondMenuOpen: WritableSignal<boolean> = signal<boolean>(false);

  protected readonly currencyButtonsConfig$: Observable<DropdownButtonConfig[]> = of([
    {
      defaultLabel: 'USD',
      type: MenuType.CURRENCY,
    },
    {
      defaultLabel: 'EUR',
      type: MenuType.CURRENCY,
    },
    {
      defaultLabel: 'PLN',
      type: MenuType.CURRENCY,
    },
    {
      defaultLabel: 'GBP',
      type: MenuType.CURRENCY,
    },
  ]);

  protected readonly languagesButtonConfig$: Observable<DropdownButtonConfig[]> = of([
    {
      key: '',
      defaultLabel: 'English (US)',
      iconUrl: 'assets/header/flags/united-states-flag.jpg',
      type: MenuType.LANGUAGE,
    },
    {
      key: '',
      defaultLabel: 'Polish (PL)',
      iconUrl: 'assets/header/flags/poland-flag.jpg',
      type: MenuType.LANGUAGE,
    },
  ]);

  protected onMenuOpen(): void {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  protected onSecondMenuOpen(): void {
    this.isSecondMenuOpen.set(!this.isSecondMenuOpen());
  }
}
