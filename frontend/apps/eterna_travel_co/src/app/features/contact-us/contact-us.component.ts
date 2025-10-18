import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { FormOptions } from '@shared/models';
import { ButtonComponent, InputComponent, InputType } from '@shared/ui';
import { contactCards, formOptions } from './contact-us.const';
import { ContactCard, ContactUsControls } from './contact-us.model';
import { ContactUsService } from './contact-us.service';

@Component({
  selector: 'et-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
  imports: [TranslatePipe, ButtonComponent, InputComponent, ReactiveFormsModule],
})
export class ContactUsComponent {
  private readonly contactUsService = inject(ContactUsService);

  protected readonly form: FormGroup<ContactUsControls> = this.contactUsService.getFormGroup();

  protected readonly contactCards: ContactCard[] = contactCards;
  protected readonly formOptions: FormOptions[] = formOptions;

  protected readonly InputType = InputType;

  protected sendMessage(): void {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((control: FormControl) => {
        control.markAsTouched();
        control.updateValueAndValidity();
      });

      return;
    }
  }
}
