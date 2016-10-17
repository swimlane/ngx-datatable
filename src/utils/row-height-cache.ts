/**
 * This object contains the cache of the various row heights that are present inside
 * the data table.   Its based on Fenwick tree data structure that helps with
 * querying sums that have time complexity of log n.
 *
 * Fenwick Tree Credits: http://petr-mitrichev.blogspot.com/2013/05/fenwick-tree-range-updates.html
 * https://github.com/mikolalysenko/fenwick-tree
 *
 */
export class RowHeightCache {

  /**
   * Tree Array stores the cumulative information of the row heights to perform efficient
   * range queries and updates.  Currently the tree is initialized to the base row
   * height instead of the detail row height.
   */
  private _treeArray: Array<number> = [];

  /**
   * Clear the Tree array.
   */
  clearCache() {
    this._treeArray = [];
  }

  /**
   * Initialize the Fenwick tree with row Heights.
   *
   * @param rows The array of rows which contain the expanded status.
   * @param rowHeight The row height.
   * @param detailRowHeight The detail row height.
   */
  initCache ( rows: Array<any>, rowHeight: number, detailRowHeight: number) {
    const n = rows.length;
    this._treeArray = new Array(n);

    for(let i = 0; i < n; ++i) {
      this._treeArray[i] = 0;
    }

    for(let i = 0; i < n; ++i) {
      let currentRowHeight = rowHeight;

      // Add the detail row height to the already expanded rows.
      // This is useful for the table that goes through a filter or sort.
      const row = rows[i];
      if (row && row.$$expanded === 1) {
        currentRowHeight += detailRowHeight;
      }

      this.update(i, currentRowHeight);
    }
  }

  /**
   * Given the ScrollY position i.e. sum, provide the rowIndex
   * that is present in the current view port.  Below handles edge cases.
   *
   * @param scrollY - The scrollY position.
   * @returns {number} - Index representing the first row visible in the viewport
   */
  getRowIndex(scrollY: number): number {
    if(scrollY === 0) {
      return 0;
    } else {
      return this._getRowIndex(scrollY);
    }
  }

  /**
   * When a row is expanded or rowHeight is changed, update the height.  This can
   * be utilized in future when Angular Data table supports dynamic row heights.
   *
   *
   * @param atRowIndex Update the data at this index row in the grid.
   * @param byRowHeight Update by the rowHeight provided.
   */
  update (atRowIndex: number, byRowHeight: number) {
    if (this._treeArray.length === 0) {
      throw new Error(`Update at index ${atRowIndex} with value ${byRowHeight} failed:
        Row Height cache not initialized.`);
    }

    let n = this._treeArray.length;
    atRowIndex |= 0;

    while(atRowIndex < n) {
      this._treeArray[atRowIndex] += byRowHeight;
      atRowIndex |= (atRowIndex + 1);
    }
  }

  /**
   * Range Sum query from 1 to the rowIndex
   *
   * @param atIndex The row index until which the total height needs to be obtained.
   * @returns {number} The total height from row 1 to the rowIndex.
   */
  query(atIndex: number): number {
    if (this._treeArray.length === 0) {
      throw new Error(`query at index ${atIndex} failed: Fenwick tree array not initialized. `);
    }

    let sum = 0;
    atIndex |= 0;

    while(atIndex >= 0) {
      sum += this._treeArray[atIndex];
      atIndex = (atIndex & (atIndex + 1)) - 1;
    }

    return sum;
  }

  /**
   * Find the total height between 2 row indexes
   * @param atIndexA The row index from
   * @param atIndexB The row index to
   * @returns {number} total pixel height between 2 row indexes.
   */
  queryBetween(atIndexA: number, atIndexB: number): number {
    return this.query(atIndexB) - this.query(atIndexA - 1);
  }

  /**
   * Given the ScrollY position i.e. sum, provide the rowIndex
   * that is present in the current view port.
   *
   * @param sum - The scrollY position.
   * @returns {number} - Index representing the first row visible in the viewport
   */
  private _getRowIndex( sum: number) {
    if (this._treeArray.length === 0) {
      return 0;
    }

    let pos = -1;
    let dataLength = this._treeArray.length;

    // Get the highest bit for the block size.
    let highestBit = Math.pow(2, dataLength.toString(2).length - 1);

    for (let blockSize = highestBit; blockSize !== 0; blockSize >>= 1) {
      let nextPos = pos + blockSize;
      if (nextPos < dataLength && sum >= this._treeArray[nextPos]) {
        sum -= this._treeArray[nextPos];
        pos = nextPos;
      }
    }

    return pos + 1;
  }

}
