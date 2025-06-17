import {
  ColumnGroupWidth,
  PinnedColumns,
  TableColumnGroup,
  TableColumnInternal
} from '../types/internal.types';

/**
 * Returns the columns by pin.
 */
export function columnsByPin(cols: TableColumnInternal[]) {
  const ret: TableColumnGroup = {
    left: [],
    center: [],
    right: []
  };

  if (cols) {
    for (const col of cols) {
      if (col.frozenLeft) {
        ret.left.push(col);
      } else if (col.frozenRight) {
        ret.right.push(col);
      } else {
        ret.center.push(col);
      }
    }
  }

  return ret;
}

/**
 * Returns the widths of all group sets of a column
 */
export function columnGroupWidths(
  groups: TableColumnGroup,
  all: TableColumnInternal[]
): ColumnGroupWidth {
  return {
    left: columnTotalWidth(groups.left),
    center: columnTotalWidth(groups.center),
    right: columnTotalWidth(groups.right),
    total: Math.floor(columnTotalWidth(all))
  };
}

/**
 * Calculates the total width of all columns
 */
export function columnTotalWidth(columns?: TableColumnInternal[]) {
  return columns?.reduce((total, column) => total + column.width, 0) ?? 0;
}

export function columnsByPinArr(val: TableColumnInternal[]): PinnedColumns[] {
  const colsByPin = columnsByPin(val);
  return [
    { type: 'left' as const, columns: colsByPin.left },
    { type: 'center' as const, columns: colsByPin.center },
    { type: 'right' as const, columns: colsByPin.right }
  ];
}
