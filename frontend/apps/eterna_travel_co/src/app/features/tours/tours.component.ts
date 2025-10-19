import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'et-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToursComponent {}
