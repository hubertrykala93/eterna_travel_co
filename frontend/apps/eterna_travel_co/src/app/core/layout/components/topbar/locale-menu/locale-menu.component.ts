import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'et-locale-menu',
  templateUrl: './locale-menu.component.html',
  styleUrl: './locale-menu.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocaleMenuComponent {}
