// maybe rename this file to prop-getters.ts

import { TableColumnProp } from "../types";

export type ValueGetter = (obj: any, prop: TableColumnProp) => any;

/**
 * Always returns the empty string ''
 * @returns {string}
 */
export function emptyStringGetter() {
  return '';
}

/**
 * Returns the appropriate getter function for this kind of prop.
 * If prop == null, returns the emptyStringGetter.
 */
export function getterForProp(prop: TableColumnProp): ValueGetter {
  if (prop == null) return emptyStringGetter;

  if (typeof prop === 'number') {
    return numericIndexGetter;
  }
  else {
    // deep or simple
    if (prop.indexOf('.') !== -1) {
      return deepValueGetter;
    }
    else {
      return shallowValueGetter;
    }
  }
}

/**
 * Returns the value at this numeric index.
 * @param row array of values
 * @param index numeric index
 * @returns {any} or '' if invalid index
 */
export function numericIndexGetter(row: any[], index: number) {
  // mimic behavior of deepValueGetter
  if (!row || index == null) return row;

  const value = row[index];
  if (value == null) return '';
  return value;
}

/**
 * Returns the value of a field.
 * (more efficient than deepValueGetter)
 * @param obj object containing the field
 * @param fieldName field name string
 * @returns {any}
 */
export function shallowValueGetter(obj: Object, fieldName: string) {
  if(!obj || !fieldName) return obj;

  let value = obj[fieldName];
  if (value == null) return '';
  return value;
}

/**
 * Returns a deep object given a string. zoo['animal.type']
 * @param {object} obj
 * @param {string} path
 */
export function deepValueGetter(obj: object, path: string) {
  if(!obj || !path) return obj;

  let current = obj;
  const split = path.split('.');

  if(split.length) {
    for(let i = 0; i < split.length; i++) {
      current = current[split[i]];

      // if found undefined, return empty string
      if(current === undefined || current === null) return '';
    }
  }

  return current;
}
