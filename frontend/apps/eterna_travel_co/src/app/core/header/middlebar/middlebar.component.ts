import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthenticationService, UserStore } from '@user/data-access';
import { tap } from 'rxjs';
import { MenuType } from '../header.enum';
import { NavComponent } from '../nav/nav.component';
import { DropdownSelectorComponent } from '../toolbar/dropdown-selector/dropdown-selector.component';

@Component({
  selector: 'et-middlebar',
  templateUrl: './middlebar.component.html',
  styleUrl: './middlebar.component.scss',
  imports: [RouterLink, NavComponent, DropdownSelectorComponent, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiddlebarComponent {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly userStore = inject(UserStore);
  private readonly router = inject(Router);

  protected readonly MenuType = MenuType;

  protected isMainMenuOpen: WritableSignal<boolean> = signal<boolean>(false);
  protected isAuthMenuOpen: WritableSignal<boolean> = signal<boolean>(false);

  protected readonly isAuthenticated = this.userStore.isAuthenticated;

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

  protected logout(): void {
    this.userStore.logout();

    this.authenticationService
      .logout()
      .pipe(tap(() => this.router.navigateByUrl('/')))
      .subscribe();
  }
}
