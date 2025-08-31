import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavigationButtonConfig } from '@shared/models';
import { HeaderService } from '@shared/util';
import { Observable } from 'rxjs';
import { DropdownSelectorComponent } from '../dropdown-selector/dropdown-selector.component';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'et-middlebar',
  templateUrl: './middlebar.component.html',
  styleUrl: './middlebar.component.scss',
  imports: [RouterLink, NavComponent, DropdownSelectorComponent],
})
export class MiddlebarComponent {
  private readonly headerService = inject(HeaderService);
  protected isMainMenuOpen: WritableSignal<boolean> = signal<boolean>(false);
  protected isAuthMenuOpen: WritableSignal<boolean> = signal<boolean>(false);

  protected readonly mainMenuButtonConfig$: Observable<NavigationButtonConfig[]> =
    this.headerService.getMainMenuNavigationButtons();

  protected readonly authMenuButtonConfig$: Observable<NavigationButtonConfig[]> =
    this.headerService.getAuthMenuNavigationButtons();

  protected onMainMenuOpen(): void {
    this.isMainMenuOpen.set(!this.isMainMenuOpen());
  }

  protected onAuthMenuOpen(): void {
    this.isAuthMenuOpen.set(!this.isAuthMenuOpen());
  }
}
