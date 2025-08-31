import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { DropdownSelectorComponent } from '../dropdown-selector/dropdown-selector.component';
import { DropdownButtonConfig } from '../header.model';
import { NavComponent } from '../nav/nav.component';
import { NavService } from '../nav/nav.service';

@Component({
  selector: 'et-middlebar',
  templateUrl: './middlebar.component.html',
  styleUrl: './middlebar.component.scss',
  imports: [RouterLink, NavComponent, DropdownSelectorComponent],
})
export class MiddlebarComponent {
  private readonly navService = inject(NavService);
  protected isMainMenuOpen: WritableSignal<boolean> = signal<boolean>(false);
  protected isAuthMenuOpen: WritableSignal<boolean> = signal<boolean>(false);

  protected readonly mainMenuButtonConfig$: Observable<DropdownButtonConfig[]> =
    this.navService.getMainMenuNavigationButtons();

  protected readonly authMenuButtonConfig$: Observable<DropdownButtonConfig[]> =
    this.navService.getAuthMenuNavigationButtons();

  protected onMainMenuOpen(): void {
    this.isMainMenuOpen.set(!this.isMainMenuOpen());
  }

  protected onAuthMenuOpen(): void {
    this.isAuthMenuOpen.set(!this.isAuthMenuOpen());
  }
}
