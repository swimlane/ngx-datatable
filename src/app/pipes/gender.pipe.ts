import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'gender' })
export class GenderPipe implements PipeTransform {
  transform(value: string): string {
    if (!value || value === '') {
      return '';
    } else {
      switch (value) {
        case 'female':
          return `${value} ♀`;
        case 'male':
          return `${value} ♂`;
        default:
          return value;
      }
    }
  }
}
