import { Component } from '@angular/core';
import { TopbarComponent } from './components/topbar/topbar.component';

@Component({
  selector: 'et-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  imports: [TopbarComponent],
})
export class LayoutComponent {}
