import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { LocaleMenuComponent } from './locale-menu/locale-menu.component';

@Component({
  selector: 'et-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
  imports: [LocaleMenuComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {
  protected isCurrencyMenuOpen: WritableSignal<boolean> = signal<boolean>(false);
  protected isLanguageMenuOpen: WritableSignal<boolean> = signal<boolean>(false);

  protected onOpenCurrencyMenu(): void {
    this.isCurrencyMenuOpen.set(!this.isCurrencyMenuOpen());
  }

  protected onOpenLanguageMenu(): void {
    this.isLanguageMenuOpen.set(!this.isLanguageMenuOpen());
  }
}
