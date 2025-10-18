import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { EmailValidators } from '@shared/util/validators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ContactUsControls, ContactUsDto } from './contact-us.model';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  private readonly http = inject(HttpClient);
  private readonly _nonNullableFormBuilder = inject(NonNullableFormBuilder);

  public sendMessage(data: ContactUsDto): Observable<void> {
    return this.http.put<void>(`${environment.backendUrl}/contact`, data);
  }

  public getFormGroup(): FormGroup<ContactUsControls> {
    return this._nonNullableFormBuilder.group<ContactUsControls>({
      name: this._nonNullableFormBuilder.control<string>('', {
        validators: [Validators.required, Validators.maxLength(64)],
      }),
      email: this._nonNullableFormBuilder.control<string>('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
          EmailValidators.patternValidator(),
        ],
      }),
      message: this._nonNullableFormBuilder.control<string>('', {
        validators: [Validators.required, Validators.minLength(10), Validators.maxLength(1000)],
      }),
    });
  }
}
