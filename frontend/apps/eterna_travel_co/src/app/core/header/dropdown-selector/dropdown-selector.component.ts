import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, input, InputSignal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { combineLatest, defer, map, Observable, tap } from 'rxjs';
import { DropdownButtonConfig, MenuType } from '../header.model';

@Component({
  selector: 'et-dropdown-selector',
  templateUrl: './dropdown-selector.component.html',
  styleUrl: './dropdown-selector.component.scss',
  imports: [AsyncPipe, TranslatePipe, RouterLink, CommonModule],
})
export class DropdownSelectorComponent implements OnInit {
  private readonly translateService = inject(TranslateService);

  public dropdownButtonsConfig: InputSignal<Observable<DropdownButtonConfig[]>> =
    input.required<Observable<DropdownButtonConfig[]>>();

  protected readonly isNavbar$: Observable<boolean> = defer(() =>
    this.dropdownButtonsConfig().pipe(
      map((buttons) => buttons.some((button) => button.type === MenuType.NAV)),
    ),
  );

  protected onChange(button: DropdownButtonConfig): void {
    if (button.type === MenuType.LANGUAGE) {
      if (button.lang) {
        this.translateService.use(button.lang);
      }
    }
  }

  ngOnInit(): void {
    combineLatest([this.dropdownButtonsConfig(), this.isNavbar$])
      .pipe(
        tap(([buttons, isNavbar]) => {
          console.log('Buttons ->', buttons);
          console.log('Is Navbar -> ', isNavbar);
        }),
      )
      .subscribe();
  }
}
