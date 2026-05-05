import { TableColumnGroup, TableColumnInternal } from '../types/internal.types';
import { TableColumnProp } from '../types/table-column.type';
import { columnsByPin, columnTotalWidth } from './column';

/**
 * Calculates the Total Flex Grow
 */
export const getTotalFlexGrow = (columns: TableColumnInternal[]) => {
  let totalFlexGrow = 0;

  for (const c of columns) {
    totalFlexGrow += c.flexGrow ?? 0;
  }

  return totalFlexGrow;
};

/**
 * Adjusts the column widths.
 * Inspired by: https://github.com/facebook/fixed-data-table/blob/master/src/FixedDataTableWidthHelper.js
 */
export const adjustColumnWidths = (allColumns: TableColumnInternal[], expectedWidth: number) => {
  const columnsWidth = columnTotalWidth(allColumns);
  const totalFlexGrow = getTotalFlexGrow(allColumns);
  const colsByGroup = columnsByPin(allColumns);

  if (columnsWidth !== expectedWidth) {
    scaleColumns(colsByGroup, expectedWidth, totalFlexGrow);
  }
};

/**
 * Resizes columns based on the flexGrow property, while respecting manually set widths
 */
const scaleColumns = (colsByGroup: TableColumnGroup, maxWidth: number, totalFlexGrow: number) => {
  const columns: TableColumnInternal[] = Object.values(colsByGroup).flat();
  let remainingWidth = maxWidth;

  // calculate total width and flexgrow points for columns that can be resized
  for (const column of columns) {
    if (column.$$oldWidth) {
      // when manually resized, switch off auto-resize
      column.canAutoResize = false;
    }
    if (!column.canAutoResize) {
      remainingWidth -= column.width();
      totalFlexGrow -= column.flexGrow ?? 0;
    } else {
      column.width.set(0);
    }
  }

  const hasMinWidth: Record<TableColumnProp, boolean> = {};

  // resize columns until no width is left to be distributed
  do {
    const widthPerFlexPoint = remainingWidth / totalFlexGrow;
    remainingWidth = 0;

    for (const column of columns) {
      // if the column can be resize and it hasn't reached its minimum width yet
      if (column.canAutoResize && !hasMinWidth[column.prop]) {
        const newWidth = column.width() + (column.flexGrow ?? 0) * widthPerFlexPoint;
        if (column.minWidth !== undefined && newWidth < column.minWidth) {
          remainingWidth += newWidth - column.minWidth;
          column.width.set(column.minWidth);
          hasMinWidth[column.prop] = true;
        } else {
          column.width.set(newWidth);
        }
      }
    }
  } while (remainingWidth !== 0);

  // Adjust for any remaining offset in computed widths vs maxWidth
  const totalWidthAchieved = columns.reduce((acc, col) => acc + col.width(), 0);
  const delta = maxWidth - totalWidthAchieved;

  if (delta === 0) {
    return;
  }

  // adjust the first column that can be auto-resized respecting the min/max widths
  for (const col of columns.filter(c => c.canAutoResize).sort((a, b) => a.width() - b.width())) {
    if (
      (delta > 0 && (!col.maxWidth || col.width() + delta <= col.maxWidth)) ||
      (delta < 0 && (!col.minWidth || col.width() + delta >= col.minWidth))
    ) {
      col.width.update(value => value + delta);
      break;
    }
  }
};

/**
 * Forces the width of the columns to
 * distribute equally but overflowing when necessary
 *
 * Rules:
 *
 *  - If combined withs are less than the total width of the grid,
 *    proportion the widths given the min / max / normal widths to fill the width.
 *
 *  - If the combined widths, exceed the total width of the grid,
 *    use the standard widths.
 *
 *  - If a column is resized, it should always use that width
 *
 *  - The proportional widths should never fall below min size if specified.
 *
 *  - If the grid starts off small but then becomes greater than the size ( + / - )
 *    the width should use the original width; not the newly proportioned widths.
 */
export const forceFillColumnWidths = (
  allColumns: TableColumnInternal[],
  expectedWidth: number,
  startIdx: number,
  allowBleed: boolean,
  defaultColWidth: number = 150,
  verticalScrollWidth = 0
) => {
  const columnsToResize = allColumns
    .slice(startIdx + 1, allColumns.length)
    .filter(c => c.canAutoResize !== false);

  for (const column of columnsToResize) {
    if (!column.$$oldWidth) {
      column.$$oldWidth = column.width();
    }
  }

  let additionWidthPerColumn = 0;
  let exceedsWindow = false;
  let contentWidth = getContentWidth(allColumns, defaultColWidth);
  let remainingWidth = expectedWidth - contentWidth;
  const initialRemainingWidth = remainingWidth;
  const columnsProcessed: any[] = [];
  const remainingWidthLimit = 1; // when to stop

  // This loop takes care of the
  do {
    additionWidthPerColumn = remainingWidth / columnsToResize.length;
    exceedsWindow = contentWidth >= expectedWidth;

    for (const column of columnsToResize) {
      // don't bleed if the initialRemainingWidth is same as verticalScrollWidth
      if (exceedsWindow && allowBleed && initialRemainingWidth !== -1 * verticalScrollWidth) {
        column.width.update(value => value || defaultColWidth);
      } else {
        const newSize = (column.width() || defaultColWidth) + additionWidthPerColumn;

        if (column.minWidth && newSize < column.minWidth) {
          column.width.set(column.minWidth);
          columnsProcessed.push(column);
        } else if (column.maxWidth && newSize > column.maxWidth) {
          column.width.set(column.maxWidth);
          columnsProcessed.push(column);
        } else {
          column.width.set(newSize);
        }
      }

      column.width.update(value => Math.max(0, value));
    }

    contentWidth = getContentWidth(allColumns, defaultColWidth);
    remainingWidth = expectedWidth - contentWidth;
    removeProcessedColumns(columnsToResize, columnsProcessed);
  } while (remainingWidth > remainingWidthLimit && columnsToResize.length !== 0);

  // reset so we don't have stale values
  for (const column of columnsToResize) {
    column.$$oldWidth = 0;
  }
};

/**
 * Remove the processed columns from the current active columns.
 */
const removeProcessedColumns = (
  columnsToResize: TableColumnInternal[],
  columnsProcessed: TableColumnInternal[]
) => {
  for (const column of columnsProcessed) {
    const index = columnsToResize.indexOf(column);
    columnsToResize.splice(index, 1);
  }
};

/**
 * Gets the width of the columns
 */
const getContentWidth = (allColumns: TableColumnInternal[], defaultColWidth = 150): number => {
  let contentWidth = 0;

  for (const column of allColumns) {
    contentWidth += column.width() || defaultColWidth;
  }

  return contentWidth;
};
