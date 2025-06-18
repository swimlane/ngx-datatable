import { getterForProp } from './column-prop-getters';
import { Group, SortDirection, SortPropDir, SortType } from '../types/public.types';
import { TableColumnProp } from '../types/table-column.type';
import { SortableTableColumnInternal, TableColumnInternal } from '../types/internal.types';

/**
 * Gets the next sort direction
 */
export function nextSortDir(
  sortType: SortType,
  current: SortDirection | 'desc' | 'asc' | undefined
): SortDirection | undefined {
  if (sortType === SortType.single) {
    if (current === SortDirection.asc) {
      return SortDirection.desc;
    } else {
      return SortDirection.asc;
    }
  } else {
    if (!current) {
      return SortDirection.asc;
    } else if (current === SortDirection.asc) {
      return SortDirection.desc;
    } else if (current === SortDirection.desc) {
      return undefined;
    }
    // avoid TS7030: Not all code paths return a value.
    return undefined;
  }
}

/**
 * Adapted from fueld-ui on 6/216
 * https://github.com/FuelInteractive/fuel-ui/tree/master/src/pipes/OrderBy
 */
export function orderByComparator(a: any, b: any): number {
  if (a === null || typeof a === 'undefined') {
    a = 0;
  }
  if (b === null || typeof b === 'undefined') {
    b = 0;
  }
  if (a instanceof Date && b instanceof Date) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
  } else if (isNaN(parseFloat(a)) || !isFinite(a) || isNaN(parseFloat(b)) || !isFinite(b)) {
    // Convert to string in case of a=0 or b=0
    a = String(a);
    b = String(b);
    // Isn't a number so lowercase the string to properly compare
    if (a.toLowerCase() < b.toLowerCase()) {
      return -1;
    }
    if (a.toLowerCase() > b.toLowerCase()) {
      return 1;
    }
  } else {
    // Parse strings as numbers to compare properly
    if (parseFloat(a) < parseFloat(b)) {
      return -1;
    }
    if (parseFloat(a) > parseFloat(b)) {
      return 1;
    }
  }

  // equal each other
  return 0;
}

/**
 * creates a shallow copy of the `rows` input and returns the sorted copy. this function
 * does not sort the `rows` argument in place
 */
export function sortRows<TRow>(
  rows: TRow[],
  columns: TableColumnInternal[],
  dirs: SortPropDir[]
): TRow[] {
  if (!rows) {
    return [];
  }
  if (!dirs || !dirs.length || !columns) {
    return [...rows];
  }

  const temp = [...rows];
  const cols = columns.reduce((obj, col) => {
    if (col.sortable) {
      obj[col.prop] = col.comparator;
    }
    return obj;
  }, {} as Record<TableColumnProp, SortableTableColumnInternal['comparator']>);

  // cache valueGetter and compareFn so that they
  // do not need to be looked-up in the sort function body
  const cachedDirs = dirs.map(dir => {
    const prop = dir.prop;
    return {
      prop,
      dir: dir.dir,
      valueGetter: getterForProp(prop),
      compareFn: cols[prop]
    };
  });

  return temp.sort((rowA: TRow, rowB: TRow) => {
    for (const cachedDir of cachedDirs) {
      // Get property and valuegetters for column to be sorted
      const { prop, valueGetter } = cachedDir;
      // Get A and B cell values from rows based on properties of the columns
      const propA = valueGetter(rowA, prop);
      const propB = valueGetter(rowB, prop);

      // Compare function gets five parameters:
      // Two cell values to be compared as propA and propB
      // Two rows corresponding to the cells as rowA and rowB
      // Direction of the sort for this column as SortDirection
      // Compare can be a standard JS comparison function (a,b) => -1|0|1
      // as additional parameters are silently ignored. The whole row and sort
      // direction enable more complex sort logic.
      const comparison =
        cachedDir.dir !== SortDirection.desc
          ? cachedDir.compareFn(propA, propB, rowA, rowB, cachedDir.dir)
          : -cachedDir.compareFn(propA, propB, rowA, rowB, cachedDir.dir);

      // Don't return 0 yet in case of needing to sort by next property
      if (comparison !== 0) {
        return comparison;
      }
    }

    return 0;
  });
}

export function sortGroupedRows<TRow>(
  groupedRows: Group<TRow>[],
  columns: TableColumnInternal[],
  dirs: SortPropDir[],
  sortOnGroupHeader: SortPropDir | undefined
): Group<TRow>[] {
  if (sortOnGroupHeader) {
    groupedRows = sortRows(groupedRows, columns, [
      {
        dir: sortOnGroupHeader.dir,
        prop: 'key'
      }
    ]);
  }
  return groupedRows.map(group => ({ ...group, value: sortRows(group.value, columns, dirs) }));
}
