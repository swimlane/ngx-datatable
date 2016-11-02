import { columnsByPin, columnsTotalWidth } from './column';

/**
 * Calculates the Total Flex Grow
 * @param {array}
 */
export function getTotalFlexGrow(columns) {
  let totalFlexGrow = 0;

  for (let c of columns) {
    totalFlexGrow += c.flexGrow || 0;
  }

  return totalFlexGrow;
}

/**
 * Adjusts the column widths.
 * Inspired by: https://github.com/facebook/fixed-data-table/blob/master/src/FixedDataTableWidthHelper.js
 * @param {array} all columns
 * @param {int} width
 */
export function adjustColumnWidths(allColumns: any, expectedWidth: any) {
  let columnsWidth = columnsTotalWidth(allColumns);
  let totalFlexGrow = getTotalFlexGrow(allColumns);
  let colsByGroup = columnsByPin(allColumns);

  if (columnsWidth !== expectedWidth) {
    scaleColumns(colsByGroup, expectedWidth, totalFlexGrow);
  }
}

/**
 * Resizes columns based on the flexGrow property, while respecting manually set widths
 * @param {array} colsByGroup
 * @param {int} maxWidth
 * @param {int} totalFlexGrow
 */
function scaleColumns(colsByGroup: any, maxWidth: any, totalFlexGrow: any) {
  // calculate total width and flexgrow points for coulumns that can be resized
  for(let attr in colsByGroup) {
    for(let column of colsByGroup[attr]) {
      if (!column.canAutoResize) {
        maxWidth -= column.width;
        totalFlexGrow -= column.flexGrow;
      } else {
        column.width = 0;
      }
    }
  }

  let hasMinWidth = {};
  let remainingWidth = maxWidth;

  // resize columns until no width is left to be distributed
  do {
    let widthPerFlexPoint = remainingWidth / totalFlexGrow;
    remainingWidth = 0;

    for(let attr in colsByGroup) {
      for(let column of colsByGroup[attr]) {
        // if the column can be resize and it hasn't reached its minimum width yet
        if (column.canAutoResize && !hasMinWidth[column.prop]) {
          let newWidth = column.width  + column.flexGrow * widthPerFlexPoint;
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
 * distribute equally but overflowing when nesc.
 *
 * Rules:
 *
 *  - If combined withs are less than the total width of the grid,
 *    proporation the widths given the min / max / noraml widths to fill the width.
 *
 *  - If the combined widths, exceed the total width of the grid,
 *    use the standard widths.
 *
 *  - If a column is resized, it should always use that width
 *
 *  - The proporational widths should never fall below min size if specified.
 *
 *  - If the grid starts off small but then becomes greater than the size ( + / - )
 *    the width should use the orginial width; not the newly proporatied widths.
 *
 * @param {array} allColumns
 * @param {int} expectedWidth
 */
export function forceFillColumnWidths(
  allColumns: any[], 
  expectedWidth: number, 
  startIdx: number, 
  defaultColWidth: number = 300) {

  let columnsToResize = startIdx > -1 ?
    allColumns.slice(startIdx, allColumns.length).filter((c) => { return c.canAutoResize !== false; }) :
    allColumns.filter((c) => { return c.canAutoResize !== false; });

  for (let column of columnsToResize) {
    if(!column.$$oldWidth) {
      column.$$oldWidth = column.width;
    }

    // Initialize the starting width to original 
    // width whenever there is a resize/initialize event.
    column.width = column.$$oldWidth;
  }

  let additionWidthPerColumn = 0;
  let exceedsWindow = false;
  let contentWidth = getContentWidth(allColumns, defaultColWidth);
  let remainingWidth = expectedWidth - contentWidth;
  let columnsProcessed = [];

  // This loop takes care of the
  do {
    additionWidthPerColumn = remainingWidth / columnsToResize.length;
    exceedsWindow = contentWidth >= expectedWidth;

    for (let column of columnsToResize) {
      if (exceedsWindow) {
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
    }

    contentWidth = getContentWidth(allColumns);
    remainingWidth = expectedWidth - contentWidth;
    removeProcessedColumns(columnsToResize, columnsProcessed);
  } while (remainingWidth > 0 && columnsToResize.length !== 0);
}

/**
 * Remove the processed columns from the current active columns.
 *
 * @param columnsToResize  Array containing the columns that need to be resized.
 * @param columnsProcessed Array containing the columns that have already been processed.
 */
function removeProcessedColumns ( columnsToResize, columnsProcessed) {
  for(let column of columnsProcessed) {
    const index = columnsToResize.indexOf(column);
    columnsToResize.splice(index, 1);
  }
}

/**
 * Gets the width of the columns
 * 
 * @param {array} allColumns
 * @param {number} [defaultColWidth=300]
 * @returns {number}
 */
function getContentWidth(allColumns: any, defaultColWidth: number = 300): number {
  let contentWidth = 0;

  for(let column of allColumns) {
      contentWidth += (column.width || defaultColWidth);
  }

  return contentWidth;
}
