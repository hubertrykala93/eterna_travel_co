import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformUrl',
  standalone: true,
})
export class TransformUrlPipe implements PipeTransform {
  transform(value: string | null, keyPrefix?: string | null): string {
    if (!value) {
      return '';
    }

    if (!keyPrefix) {
      return value
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }

    const splittedValue = value.split('-');

    if (splittedValue.length > 1) {
      const camelCaseValue =
        splittedValue[0] + splittedValue[1].charAt(0).toUpperCase() + splittedValue[1].slice(1);

      return keyPrefix + '.' + camelCaseValue;
    }

    return keyPrefix + '.' + value.split('-').join('-');
  }
}
