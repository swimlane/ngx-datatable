import { SortType, SortDirection, SortPropDir } from '../types';
import { getterForProp } from './column-prop-getters';
/**
 * Gets the next sort direction
 * @param  {SortType}      sortType
 * @param  {SortDirection} currentSort
 * @return {SortDirection}
 */
export function nextSortDir(sortType: SortType, current: SortDirection): SortDirection {
  if (sortType === SortType.single) {
    if(current === SortDirection.asc) {
      return SortDirection.desc;
    } else {
      return SortDirection.asc;
    }
  } else {
    if(!current) {
      return SortDirection.asc;
    } else if(current === SortDirection.asc) {
      return SortDirection.desc;
    } else if(current === SortDirection.desc) {
      return undefined;
    }
  }
}

/**
 * Adapted from fueld-ui on 6/216
 * https://github.com/FuelInteractive/fuel-ui/tree/master/src/pipes/OrderBy
 * @param  {any}    a
 * @param  {any}    b
 * @return {number} position
 */
export function orderByComparator(a: any, b: any): number {
  if (a === null || typeof a === 'undefined') a = 0;
  if (b === null || typeof b === 'undefined') b = 0;
  if (a instanceof Date && b instanceof Date) {
    if (a < b) return -1;
    if (a > b) return 1;
  } else if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
    // Convert to string in case of a=0 or b=0
    a = String(a);
    b = String(b);
    // Isn't a number so lowercase the string to properly compare
    if (a.toLowerCase() < b.toLowerCase()) return -1;
    if (a.toLowerCase() > b.toLowerCase()) return 1;
  } else {
    // Parse strings as numbers to compare properly
    if (parseFloat(a) < parseFloat(b)) return -1;
    if (parseFloat(a) > parseFloat(b)) return 1;
  }

  // equal each other
  return 0;
}

/**
 * Sorts the rows
 * 
 * @export
 * @param {any[]} rows
 * @param {any[]} columns
 * @param {any[]} dirs
 * @returns
 */
export function sortRows(rows: any[], columns: any[], dirs: SortPropDir[]): any[] {
  if(!rows || !dirs || !dirs.length || !columns) return rows;

  const temp = [...rows];
  const cols = columns.reduce((obj, col) => {
    if(col.comparator && typeof col.comparator === 'function') {
      obj[col.prop] = col.comparator;
    }
    return obj;
  }, {});

  // cache valueGetter and compareFn so that they
  // do not need to be looked-up in the sort function body
  const cachedDirs = dirs.map(dir => {
    const prop = dir.prop;
    return {
      prop,
      dir: dir.dir,
      valueGetter: getterForProp(prop),
      compareFn: cols[prop] || orderByComparator
    };
  });

  return temp.sort(function(a: any, b: any) {

    for(const cachedDir of cachedDirs) {
      const { prop, valueGetter } = cachedDir;
      const propA = valueGetter(a, prop);
      const propB = valueGetter(b, prop);

      const comparison = cachedDir.dir !== SortDirection.desc ?
        cachedDir.compareFn(propA, propB) :
        -cachedDir.compareFn(propA, propB);

      // Don't return 0 yet in case of needing to sort by next property
      if (comparison !== 0) return comparison;
    }

    // equal each other
    return 0;
  });
}
