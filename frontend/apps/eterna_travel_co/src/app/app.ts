import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';

@Component({
  imports: [RouterModule, LayoutComponent],
  selector: 'et-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
