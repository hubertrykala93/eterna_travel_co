import { Component, inject, signal, WritableSignal } from '@angular/core';
import { NavigationButtonConfig } from '@shared/models';
import { HeaderService } from '@shared/util';
import { Observable } from 'rxjs';
import { DropdownSelectorComponent } from '../dropdown-selector/dropdown-selector.component';

@Component({
  selector: 'et-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  imports: [DropdownSelectorComponent],
})
export class ToolbarComponent {
  private readonly headerService = inject(HeaderService);

  protected isMenuOpen: WritableSignal<boolean> = signal<boolean>(false);
  protected isSecondMenuOpen: WritableSignal<boolean> = signal<boolean>(false);

  protected currencyNavigationButtons$: Observable<NavigationButtonConfig[]> =
    this.headerService.getCurrencyMenuNavigationButtons();

  protected languageNavigationButtons$: Observable<NavigationButtonConfig[]> =
    this.headerService.getLanguageMenuNavigationButtons();

  protected onMenuOpen(): void {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  protected onSecondMenuOpen(): void {
    this.isSecondMenuOpen.set(!this.isSecondMenuOpen());
  }
}
