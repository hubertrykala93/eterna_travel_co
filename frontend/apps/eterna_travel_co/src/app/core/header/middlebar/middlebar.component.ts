import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { DropdownSelectorComponent } from '../dropdown-selector/dropdown-selector.component';
import { MenuType } from '../header.enum';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'et-middlebar',
  templateUrl: './middlebar.component.html',
  styleUrl: './middlebar.component.scss',
  imports: [RouterLink, NavComponent, DropdownSelectorComponent, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiddlebarComponent {
  protected isMainMenuOpen: WritableSignal<boolean> = signal<boolean>(false);
  protected isAuthMenuOpen: WritableSignal<boolean> = signal<boolean>(false);

  protected readonly MenuType = MenuType;

  protected onMainMenuOpen(): void {
    this.isMainMenuOpen.set(!this.isMainMenuOpen());
  }

  protected onAuthMenuOpen(): void {
    this.isAuthMenuOpen.set(!this.isAuthMenuOpen());
  }

  protected onMenuClosed(): void {
    this.isMainMenuOpen.set(false);
    this.isAuthMenuOpen.set(false);
  }
}
