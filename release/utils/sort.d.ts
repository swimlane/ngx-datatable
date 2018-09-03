import { SortType, SortDirection, SortPropDir } from '../types';
/**
 * Gets the next sort direction
 */
export declare function nextSortDir(sortType: SortType, current: SortDirection): SortDirection | undefined;
/**
 * Adapted from fueld-ui on 6/216
 * https://github.com/FuelInteractive/fuel-ui/tree/master/src/pipes/OrderBy
 */
export declare function orderByComparator(a: any, b: any): number;
/**
 * creates a shallow copy of the `rows` input and returns the sorted copy. this function
 * does not sort the `rows` argument in place
 */
export declare function sortRows(rows: any[], columns: any[], dirs: SortPropDir[]): any[];
