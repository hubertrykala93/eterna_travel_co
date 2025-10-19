import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MenuType } from '../header.enum';
import { getFilteredDropDownNavigationButtons } from '../header.helper';
import { DropDownSelectorButtonConfig } from './../header.model';

@Component({
  selector: 'et-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  imports: [RouterLink, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  protected readonly navigationButtons: DropDownSelectorButtonConfig[] =
    getFilteredDropDownNavigationButtons(MenuType.MAIN);
}
