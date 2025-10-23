import { DestroyRef, Directive, inject, Injector, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControlName,
  FormGroupDirective,
  NgControl,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { getErrorKey } from '@shared/util/helpers';
import { tap } from 'rxjs';

@Directive()
export class DisplayErrorDirective implements OnInit, ControlValueAccessor {
  protected readonly translateService = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly injector = inject(Injector);

  protected readonly formControl = signal<AbstractControl | null>(null);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly value = signal<string | number | null>(null);

  public ngOnInit(): void {
    this.assignFormControl();
    this.assignErrorKey();
  }

  private assignFormControl(): void {
    const injectedControl = this.injector.get(NgControl, null);

    if (!injectedControl) {
      return;
    }

    if (injectedControl instanceof FormControlName) {
      const control = this.injector.get(FormGroupDirective).getControl(injectedControl);
      this.formControl.set(control);
    }
  }

  private assignErrorKey(): void {
    const control = this.formControl();

    if (!control) {
      return;
    }

    control.statusChanges
      .pipe(
        tap(() => {
          const message = getErrorKey(this.translateService, control);

          message ? this.errorMessage.set(message) : this.errorMessage.set(null);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  public writeValue(value: string | number | null): void {
    this.value.set(value);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onChange(value: string): void {
    return;
  }

  protected onTouched(): void {
    return;
  }
}
