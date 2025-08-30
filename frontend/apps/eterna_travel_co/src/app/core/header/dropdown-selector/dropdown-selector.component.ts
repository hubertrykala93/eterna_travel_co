import { AsyncPipe } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { DropdownButtonConfig } from '../header.model';

@Component({
  selector: 'et-dropdown-selector',
  templateUrl: './dropdown-selector.component.html',
  styleUrl: './dropdown-selector.component.scss',
  imports: [AsyncPipe],
})
export class DropdownSelectorComponent {
  public dropdownButtonsConfig: InputSignal<Observable<DropdownButtonConfig[]>> =
    input.required<Observable<DropdownButtonConfig[]>>();
}
