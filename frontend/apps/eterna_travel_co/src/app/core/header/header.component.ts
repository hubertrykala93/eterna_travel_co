import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MiddlebarComponent } from './middlebar/middlebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@Component({
  selector: 'et-header',
  templateUrl: './header.component.html',
  imports: [ToolbarComponent, MiddlebarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
