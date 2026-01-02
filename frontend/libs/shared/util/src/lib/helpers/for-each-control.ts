import { AbstractControl, FormGroup } from '@angular/forms';

export const forEachControl = (
  form: FormGroup,
  controlKeys: string[],
  action: (control: AbstractControl) => void,
) =>
  controlKeys
    .map((key) => form.get(key))
    .filter((control): control is AbstractControl => control !== null)
    .forEach(action);
