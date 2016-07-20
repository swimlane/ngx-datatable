import { Sort } from '../models/Sort';
import { SortType } from '../enums/SortType';
import { SortDirection } from '../enums/SortDirection';

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
};

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

  if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
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
 * @param  {Array<any>}  rows
 * @param  {Array<Sort>} dirs
 * @return {Array<any>} results
 */
export function sortRows(rows: Array<any>, dirs: Array<Sort>) {
  let temp = [...rows];

  return temp.sort(function(a: any, b: any) {
    for(const { prop, dir } of dirs) {
      const comparison = dir !== SortDirection.desc ?
        orderByComparator(a[prop], b[prop]) :
        -orderByComparator(a[prop], b[prop]);

      // Don't return 0 yet in case of needing to sort by next property
      if (comparison !== 0) return comparison;
    }

    // equal each other
    return 0;
  });
}
