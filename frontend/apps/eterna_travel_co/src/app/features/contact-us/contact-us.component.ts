import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FormOptions } from '@shared/data-access';
import { ButtonComponent, TextFieldComponent, TextareaComponent } from '@shared/ui/controls';
import { ToastService } from '@shared/util/services';
import { fireValidation, resetForm } from '@shared/util/validators';
import { tap } from 'rxjs';
import { ContactCard, ContactUsControls } from './contact-us.model';
import { ContactUsService } from './contact-us.service';

@Component({
  selector: 'et-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
  imports: [
    TranslatePipe,
    ButtonComponent,
    TextareaComponent,
    ReactiveFormsModule,
    TextFieldComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactUsComponent {
  private readonly contactUsService = inject(ContactUsService);
  private readonly toastService = inject(ToastService);
  private readonly translateService = inject(TranslateService);

  protected readonly form: FormGroup<ContactUsControls> = this.contactUsService.getFormGroup();

  protected readonly contactCards: ContactCard[] = [
    {
      key: 'features.contactUs.location',
      subtitle: '88 Ocean Dr, Miami, FL 33139, USA',
      iconClass: 'fa-solid fa-location-dot',
    },
    {
      key: 'features.contactUs.phone',
      subtitle: '+1 (213) 555-4820',
      iconClass: 'fa-solid fa-mobile-screen',
    },
    {
      key: 'features.contactUs.mail',
      subtitle: 'contact@eternatravelco.com',
      iconClass: 'fa-solid fa-envelope',
    },
  ];
  protected readonly contactUsFormOptions: FormOptions[] = [
    {
      label: 'core.label.name',
      placeholder: 'core.placeholder.name',
      formControlName: 'name',
      type: 'text',
    },
    {
      label: 'core.label.email',
      placeholder: 'core.placeholder.email',
      formControlName: 'email',
      type: 'text',
    },
    {
      label: 'core.label.message',
      placeholder: 'core.placeholder.message',
      formControlName: 'message',
      type: 'textarea',
    },
  ];

  protected send(): void {
    if (this.form.invalid) {
      fireValidation(this.form);

      return;
    }

    this.contactUsService
      .sendMessage(this.form.getRawValue())
      .pipe(
        tap(() => {
          resetForm(this.form);

          this.toastService.open({
            title: this.translateService.instant('core.toast.title.messageSentSuccessfully'),
            message: this.translateService.instant('core.toast.message.receivedYourMessage'),
            status: 'success',
          });
        }),
      )
      .subscribe();
  }
}
