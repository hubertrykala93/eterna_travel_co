import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactUsControls } from './contact-us.model';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  private readonly _formBuilder = inject(FormBuilder);

  public getFormGroup(): FormGroup<ContactUsControls> {
    return this._formBuilder.group<ContactUsControls>({
      name: this._formBuilder.control<string | null>(null, {
        validators: [Validators.required],
      }),
      email: this._formBuilder.control<string | null>(null, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(8)],
      }),
      message: this._formBuilder.control<string | null>(null, {
        validators: [Validators.required],
      }),
    });
  }
}
