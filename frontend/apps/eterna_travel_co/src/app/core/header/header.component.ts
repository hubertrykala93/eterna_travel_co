import { Component } from '@angular/core';
import { MiddlebarComponent } from './middlebar/middlebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@Component({
  selector: 'et-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [ToolbarComponent, MiddlebarComponent],
})
export class HeaderComponent {}
