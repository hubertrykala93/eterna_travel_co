import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { FormOptions } from '@shared/models';
import { ButtonComponent, InputComponent, InputType } from '@shared/ui';
import { ToastService } from '@shared/util/services';
import { ValidationUtil } from '@shared/util/validators';
import { tap } from 'rxjs';
import { contactCards, formOptions } from './contact-us.const';
import { ContactCard, ContactUsControls } from './contact-us.model';
import { ContactUsService } from './contact-us.service';

@Component({
  selector: 'et-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
  imports: [TranslatePipe, ButtonComponent, InputComponent, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactUsComponent {
  private readonly contactUsService = inject(ContactUsService);
  private readonly toastService = inject(ToastService);

  protected readonly form: FormGroup<ContactUsControls> = this.contactUsService.getFormGroup();

  protected readonly contactCards: ContactCard[] = contactCards;
  protected readonly formOptions: FormOptions[] = formOptions;

  protected readonly InputType = InputType;

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
            titleKey: 'core.toast.title.message-sent-successfully',
            messageKey: 'core.toast.message.received-your-message',
            status: 'success',
          });
        }),
      )
      .subscribe();
  }
}
