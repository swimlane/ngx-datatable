/**
 * Calculates the Total Flex Grow
 * @param {array}
 */
export declare function getTotalFlexGrow(columns: any[]): number;
/**
 * Adjusts the column widths.
 * Inspired by: https://github.com/facebook/fixed-data-table/blob/master/src/FixedDataTableWidthHelper.js
 * @param {array} all columns
 * @param {int} width
 */
export declare function adjustColumnWidths(allColumns: any, expectedWidth: any): void;
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
 *
 * @param {array} allColumns
 * @param {int} expectedWidth
 * @param {int} startIdx
 * @param {boolean} allowBleed
 * @param {int} defaultColWidth
 */
export declare function forceFillColumnWidths(allColumns: any[], expectedWidth: number, startIdx: number, allowBleed: boolean, defaultColWidth?: number): void;
