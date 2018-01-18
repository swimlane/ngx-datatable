import { columnsByPin, columnsTotalWidth } from './column';

/**
 * Calculates the Total Flex Grow
 */
export function getTotalFlexGrow(columns: any[]) {
  let totalFlexGrow = 0;

  for (const c of columns) {
    totalFlexGrow += c.flexGrow || 0;
  }

  return totalFlexGrow;
}

/**
 * Adjusts the column widths.
 * Inspired by: https://github.com/facebook/fixed-data-table/blob/master/src/FixedDataTableWidthHelper.js
 */
export function adjustColumnWidths(allColumns: any, expectedWidth: any) {
  const columnsWidth = columnsTotalWidth(allColumns);
  const totalFlexGrow = getTotalFlexGrow(allColumns);
  const colsByGroup = columnsByPin(allColumns);

  if (columnsWidth !== expectedWidth) {
    scaleColumns(colsByGroup, expectedWidth, totalFlexGrow);
  }
}

/**
 * Resizes columns based on the flexGrow property, while respecting manually set widths
 */
function scaleColumns(colsByGroup: any, maxWidth: any, totalFlexGrow: any) {
  // calculate total width and flexgrow points for coulumns that can be resized
  for(const attr in colsByGroup) {
    for(const column of colsByGroup[attr]) {
      if (!column.canAutoResize) {
        maxWidth -= column.width;
        totalFlexGrow -= column.flexGrow ? column.flexGrow : 0;
      } else {
        column.width = 0;
      }
    }
  }

  const hasMinWidth = {};
  let remainingWidth = maxWidth;

  // resize columns until no width is left to be distributed
  do {
    const widthPerFlexPoint = remainingWidth / totalFlexGrow;
    remainingWidth = 0;

    for(const attr in colsByGroup) {
      for(const column of colsByGroup[attr]) {
        // if the column can be resize and it hasn't reached its minimum width yet
        if (column.canAutoResize && !hasMinWidth[column.prop]) {
          const newWidth = column.width  + column.flexGrow * widthPerFlexPoint;
          if (column.minWidth !== undefined && newWidth < column.minWidth) {
            remainingWidth += newWidth - column.minWidth;
            column.width = column.minWidth;
            hasMinWidth[column.prop] = true;
          } else {
            column.width = newWidth;
          }
        }
      }
    }
  } while (remainingWidth !== 0);
}

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
export function forceFillColumnWidths(
  allColumns: any[],
  expectedWidth: number,
  startIdx: number,
  allowBleed: boolean,
  defaultColWidth: number = 300) {
  
  const columnsToResize = allColumns
    .slice(startIdx + 1, allColumns.length)
    .filter((c) => { 
      return c.canAutoResize !== false; 
    });

  for (const column of columnsToResize) {
    if(!column.$$oldWidth) {
      column.$$oldWidth = column.width;
    }
  }

  let additionWidthPerColumn = 0;
  let exceedsWindow = false;
  let contentWidth = getContentWidth(allColumns, defaultColWidth);
  let remainingWidth = expectedWidth - contentWidth;
  const columnsProcessed: any[] = [];

  // This loop takes care of the
  do {
    additionWidthPerColumn = remainingWidth / columnsToResize.length;
    exceedsWindow = contentWidth >= expectedWidth;

    for (const column of columnsToResize) {
      if (exceedsWindow && allowBleed) {
        column.width = column.$$oldWidth || column.width || defaultColWidth;
      } else {
        const newSize = (column.width || defaultColWidth) + additionWidthPerColumn;

        if (column.minWidth && newSize < column.minWidth) {
          column.width = column.minWidth;
          columnsProcessed.push(column);
        } else if (column.maxWidth && newSize > column.maxWidth) {
          column.width = column.maxWidth;
          columnsProcessed.push(column);
        } else {
          column.width = newSize;
        }
      }

      column.width = Math.max(0, column.width);
    }

    contentWidth = getContentWidth(allColumns);
    remainingWidth = expectedWidth - contentWidth;
    removeProcessedColumns(columnsToResize, columnsProcessed);
  } while (remainingWidth > 0 && columnsToResize.length !== 0);
}

/**
 * Remove the processed columns from the current active columns.
 */
function removeProcessedColumns(columnsToResize: any[], columnsProcessed: any[]) {
  for(const column of columnsProcessed) {
    const index = columnsToResize.indexOf(column);
    columnsToResize.splice(index, 1);
  }
}

/**
 * Gets the width of the columns
 */
function getContentWidth(allColumns: any, defaultColWidth: number = 300): number {
  let contentWidth = 0;

  for(const column of allColumns) {
      contentWidth += (column.width || defaultColWidth);
  }

  return contentWidth;
}
