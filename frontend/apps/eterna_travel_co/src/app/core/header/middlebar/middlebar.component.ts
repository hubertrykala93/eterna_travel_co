import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'et-middlebar',
  templateUrl: './middlebar.component.html',
  styleUrl: './middlebar.component.scss',
  imports: [RouterLink, NavComponent],
})
export class MiddlebarComponent {}
