import { SortType, SortDirection, SortPropDir } from '../types';
/**
 * Gets the next sort direction
 * @param  {SortType}      sortType
 * @param  {SortDirection} currentSort
 * @return {SortDirection}
 */
export declare function nextSortDir(sortType: SortType, current: SortDirection): SortDirection;
/**
 * Adapted from fueld-ui on 6/216
 * https://github.com/FuelInteractive/fuel-ui/tree/master/src/pipes/OrderBy
 * @param  {any}    a
 * @param  {any}    b
 * @return {number} position
 */
export declare function orderByComparator(a: any, b: any): number;
/**
 * Sorts the rows
 *
 * @export
 * @param {any[]} rows
 * @param {any[]} columns
 * @param {any[]} dirs
 * @returns
 */
export declare function sortRows(rows: any[], columns: any[], dirs: SortPropDir[]): any[];
