import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '@authentication/data-access';
import { LoaderComponent, ToastComponent } from '@shared/ui';
import { filter, map, Observable } from 'rxjs';
import { HeaderComponent } from './core/header/header.component';
import { HeroComponent } from './core/hero/hero.component';

@Component({
  imports: [
    RouterModule,
    HeaderComponent,
    HeroComponent,
    ToastComponent,
    AsyncPipe,
    LoaderComponent,
  ],
  selector: 'et-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly router = inject(Router);

  protected readonly isAuthenticationPage$: Observable<boolean> = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map((event) => event.url.includes('authentication')),
  );

  private readonly currentUser = this.authenticationService.getCurrentUser().pipe().subscribe();
}
