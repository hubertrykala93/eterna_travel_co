import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { DropdownButtonConfig } from '../header.model';
import { NavService } from './nav.service';

@Component({
  selector: 'et-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  imports: [AsyncPipe, RouterLink, TranslatePipe],
})
export class NavComponent {
  private readonly navService = inject(NavService);

  protected readonly navigationButtons$: Observable<DropdownButtonConfig[]> =
    this.navService.getMainMenuNavigationButtons();
}
