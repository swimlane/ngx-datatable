import { numberAttribute } from '@angular/core';

/**
 * Same as {@link numberAttribute} but returns `undefined` if the value is `undefined`.
 * {@link numberAttribute} would return `NaN` in that case.
 * @param value
 */
// Must be a function.
export function numberOrUndefinedAttribute(value: unknown | undefined): number | undefined {
  if (value === undefined) {
    return undefined;
  }

  return numberAttribute(value);
}
