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

    return keyPrefix + '.' + value.split('-').join('-');
  }
}
