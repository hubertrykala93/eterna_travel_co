import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputType } from '@shared/util/types';
import { ControlFieldComponent } from '../control-field/control-field.component';
import { InputDirective } from '../directives/input.directive';

@Component({
  selector: 'ui-text-field',
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss',
  imports: [ControlFieldComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextFieldComponent,
      multi: true,
    },
  ],
})
export class TextFieldComponent extends InputDirective {
  private readonly isPasswordVisible = signal<boolean>(false);

  protected readonly passwordIcon = computed<string>(() =>
    this.isPasswordVisible() ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye',
  );

  protected readonly passwordType = computed<InputType>(() =>
    this.isPasswordVisible() ? 'text' : 'password',
  );

  protected setPasswordVisibility(): void {
    this.isPasswordVisible.update((visible) => !visible);
  }
}
