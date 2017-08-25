import { SortType, SortDirection, SortPropDir } from '../types';
/**
 * Gets the next sort direction
 */
export declare function nextSortDir(sortType: SortType, current: SortDirection): SortDirection;
/**
 * Adapted from fueld-ui on 6/216
 * https://github.com/FuelInteractive/fuel-ui/tree/master/src/pipes/OrderBy
 */
export declare function orderByComparator(a: any, b: any): number;
/**
 * Sorts the rows
 */
export declare function sortRows(rows: any[], columns: any[], dirs: SortPropDir[]): any[];
