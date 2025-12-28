import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FormOptions } from '@shared/data-access';
import { ButtonComponent, TextareaComponent, TextFieldComponent } from '@shared/ui/controls';
import { ToastService } from '@shared/util/services';
import { ValidationUtil } from '@shared/util/validators';
import { tap } from 'rxjs';
import { contactCards, contactUsFormOptions } from './contact-us.const';
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

  protected readonly contactCards: ContactCard[] = contactCards;
  protected readonly contactUsFormOptions: FormOptions[] = contactUsFormOptions;

  protected send(): void {
    if (this.form.invalid) {
      ValidationUtil.fireValidation(this.form);

      return;
    }

    this.contactUsService
      .sendMessage(this.form.getRawValue())
      .pipe(
        tap(() => {
          ValidationUtil.resetForm(this.form);

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
