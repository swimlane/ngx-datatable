
import { SortType, SortDirection } from '../types';
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
 * @param  {Array<any>}  rows
 * @param  {Array<Sort>} dirs
 * @return {Array<any>} results
 */
export declare function sortRows(rows: Array<any>, dirs: any[]): any[];
