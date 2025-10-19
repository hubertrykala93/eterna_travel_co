import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { TransformUrlPipe } from '@shared/util/pipes';
import { filter, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'et-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  imports: [AsyncPipe, TransformUrlPipe, RouterLink, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  protected isHomePage$: Observable<boolean> = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map((event) => event.urlAfterRedirects === '/'),
    startWith(this.router.url === '/'),
  );

  protected readonly showForm$: Observable<boolean> = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map(() => {
      let route = this.activatedRoute.firstChild;

      while (route?.firstChild) {
        route = route.firstChild;
      }

      return route?.snapshot.data['showForm'] ?? false;
    }),
  );

  protected readonly pageTitle$: Observable<string> = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map(() => {
      return this.router.url.split('/')[1];
    }),
  );
}
