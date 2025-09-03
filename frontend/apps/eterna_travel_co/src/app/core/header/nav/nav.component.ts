import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { DropDownSelectorButtonConfig, MenuType } from '@shared/models';
import { HeaderService } from '@shared/util/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'et-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  imports: [AsyncPipe, RouterLink, TranslatePipe],
})
export class NavComponent {
  private readonly headerService = inject(HeaderService);

  protected navigationButtons$: Observable<DropDownSelectorButtonConfig[]> =
    this.headerService.getFilteredDropDownNavigationButtons(MenuType.MAIN);
}
