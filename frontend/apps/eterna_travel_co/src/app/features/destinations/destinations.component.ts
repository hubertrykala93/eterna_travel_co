import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'et-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestinationsComponent {}
