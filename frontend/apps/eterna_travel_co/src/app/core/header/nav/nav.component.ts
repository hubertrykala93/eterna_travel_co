import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { NavigationButtonConfig } from '@shared/models';
import { HeaderService } from '@shared/util';
import { Observable } from 'rxjs';

@Component({
  selector: 'et-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  imports: [AsyncPipe, RouterLink, TranslatePipe],
})
export class NavComponent {
  private readonly headerService = inject(HeaderService);

  protected readonly navigationButtons$: Observable<NavigationButtonConfig[]> =
    this.headerService.getMainMenuNavigationButtons();
}
