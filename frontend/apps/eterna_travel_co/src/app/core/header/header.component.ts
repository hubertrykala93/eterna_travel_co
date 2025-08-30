import { Component } from '@angular/core';
import { ToolbarComponent } from './toolbar/toolbar.component';

@Component({
  selector: 'et-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [ToolbarComponent],
})
export class HeaderComponent {}
