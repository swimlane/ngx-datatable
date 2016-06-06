import { Pipe } from '@angular/core';

/**
 * Map to Iteratble Pipe
 *
 * Example:
 *
 *  <div *ngFor="let keyValuePair of someObject | mapToIterable">
 *    key {{keyValuePair.key}} and value {{keyValuePair.value}}
 *  </div>
 *
 * Concepts from:
 *    http://stackoverflow.com/questions/31490713/iterate-over-typescript-dictionary-in-angular-2
 *    https://webcake.co/object-properties-in-angular-2s-ngfor/
 *
 * See: https://github.com/angular/angular/issues/2246
 *
 */
@Pipe({ name: 'mapToIterable' })
export class MapToIterable {
  transform(value: any) {
    let result = [];

    if(value.entries) {
      for (var [key, value] of value.entries()) {
        result.push({ key, value });
      }
    } else {
      for(let key in value) {
        result.push({ key, value: value[key] });
      }
    }

    return result;
  }
}
