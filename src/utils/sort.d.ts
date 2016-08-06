/// <reference types="core-js" />
import { Sort } from '../models/Sort';
import { SortType } from '../enums/SortType';
import { SortDirection } from '../enums/SortDirection';
export declare function nextSortDir(sortType: SortType, current: SortDirection): SortDirection;
export declare function orderByComparator(a: any, b: any): number;
export declare function sortRows(rows: Array<any>, dirs: Array<Sort>): any[];
