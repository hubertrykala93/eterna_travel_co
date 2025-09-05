import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '@shared/ui';
import { HeaderComponent } from './core/header/header.component';
import { HeroComponent } from './core/hero/hero.component';

@Component({
  imports: [RouterModule, HeaderComponent, HeroComponent, ButtonComponent],
  selector: 'et-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
