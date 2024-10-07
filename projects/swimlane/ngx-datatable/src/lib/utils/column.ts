import { TableColumn, TableColumnGroup } from '../types/table-column.type';
import { ColumnGroupWidth, PinnedColumns } from '../types/internal.types';

/**
 * Returns the columns by pin.
 */
export function columnsByPin(cols: TableColumn[]) {
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
export function columnGroupWidths(groups: TableColumnGroup, all: TableColumn[]): ColumnGroupWidth {
  return {
    left: columnTotalWidth(groups.left),
    center: columnTotalWidth(groups.center),
    right: columnTotalWidth(groups.right),
    total: Math.floor(columnTotalWidth(all))
  };
}

/**
 * Calculates the total width of all columns and their groups
 */
export function columnTotalWidth(columns: TableColumn[], prop?: string) {
  let totalWidth = 0;

  if (columns) {
    for (const c of columns) {
      const has = prop && c[prop];
      const width = has ? c[prop] : c.width;
      totalWidth = totalWidth + parseFloat(width);
    }
  }

  return totalWidth;
}

/**
 * Calculates the total width of all columns and their groups
 */
export function columnsTotalWidth(columns: TableColumn[], prop?: keyof TableColumn) {
  let totalWidth = 0;

  for (const column of columns) {
    const has = prop && column[prop];
    totalWidth = totalWidth + (has ? column[prop] : column.width);
  }

  return totalWidth;
}

export function columnsByPinArr(val: TableColumn[]): PinnedColumns[] {
  const colsByPin = columnsByPin(val);
  return [
    { type: 'left' as const, columns: colsByPin.left },
    { type: 'center' as const, columns: colsByPin.center },
    { type: 'right' as const, columns: colsByPin.right }
  ];
}
