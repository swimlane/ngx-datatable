import {
  ColumnGroupWidth,
  PinnedColumns,
  TableColumnGroup,
  TableColumnInternal
} from '../types/internal.types';

/**
 * Returns the columns by pin.
 */
export const columnsByPin = (cols: TableColumnInternal[]) => {
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
};

/**
 * Returns the widths of all group sets of a column
 */
export const columnGroupWidths = (
  groups: TableColumnGroup,
  all: TableColumnInternal[]
): ColumnGroupWidth => {
  return {
    left: columnTotalWidth(groups.left),
    center: columnTotalWidth(groups.center),
    right: columnTotalWidth(groups.right),
    total: Math.floor(columnTotalWidth(all))
  };
};

/**
 * Calculates the total width of all columns
 */
export const columnTotalWidth = (columns?: TableColumnInternal[]) => {
  return columns?.reduce((total, column) => total + column.width(), 0) ?? 0;
};

/**
 * Builds the `grid-template-columns` value for the combined css-grid.
 * Produces one track per column, sized by the column's current width, in the
 * pinned render order (left, center, right). Header and body rows share this
 * single definition so every cell aligns to the same column tracks.
 *
 * `minWidth`/`maxWidth` are baked into the track via `clamp()`/`min()`/`max()`
 * so the constraints are enforced once on the shared grid instead of per cell.
 */
export const gridColumnTemplate = (cols: PinnedColumns[]): string => {
  return cols
    .flatMap(group => group.columns)
    .map(column => gridColumnTrack(column))
    .join(' ');
};

const gridColumnTrack = (column: TableColumnInternal): string => {
  const width = `${column.width()}px`;
  const min = column.minWidth ? `${column.minWidth}px` : undefined;
  const max = column.maxWidth ? `${column.maxWidth}px` : undefined;
  if (min && max) {
    return `clamp(${min}, ${width}, ${max})`;
  }
  if (min) {
    return `max(${min}, ${width})`;
  }
  if (max) {
    return `min(${max}, ${width})`;
  }
  return width;
};

export const columnsByPinArr = (val: TableColumnInternal[]): PinnedColumns[] => {
  const colsByPin = columnsByPin(val);
  return [
    { type: 'left' as const, columns: colsByPin.left },
    { type: 'center' as const, columns: colsByPin.center },
    { type: 'right' as const, columns: colsByPin.right }
  ];
};
