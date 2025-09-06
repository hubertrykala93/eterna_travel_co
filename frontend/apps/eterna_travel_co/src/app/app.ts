import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { HeroComponent } from './core/hero/hero.component';

@Component({
  imports: [RouterModule, HeaderComponent, HeroComponent],
  selector: 'et-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
