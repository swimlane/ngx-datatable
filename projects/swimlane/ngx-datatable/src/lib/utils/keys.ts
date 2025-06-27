/**
 * @deprecated The constant `Keys` should no longer be used. Instead use the value directly:
 * ```
 * // old
 * const keys: Keys = Keys.up;
 * // new
 * const keys: Keys = 'up';
 * ```
 */
export const Keys = {
  up: 'ArrowUp',
  down: 'ArrowDown',
  return: 'Enter',
  escape: 'Escape',
  left: 'ArrowLeft',
  right: 'ArrowRight'
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Keys = typeof Keys[keyof typeof Keys];
