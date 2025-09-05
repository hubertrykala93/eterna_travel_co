import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '@shared/ui';
import { HeaderComponent } from './core/header/header.component';

@Component({
  imports: [RouterModule, HeaderComponent, ButtonComponent],
  selector: 'et-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
