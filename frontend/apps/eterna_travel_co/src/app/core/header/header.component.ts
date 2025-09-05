import { Component } from '@angular/core';
import { MiddlebarComponent } from './middlebar/middlebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@Component({
  selector: 'et-header',
  templateUrl: './header.component.html',
  imports: [ToolbarComponent, MiddlebarComponent],
})
export class HeaderComponent {}
