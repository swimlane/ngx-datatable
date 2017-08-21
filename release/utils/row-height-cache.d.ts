/**
 * This object contains the cache of the various row heights that are present inside
 * the data table.   Its based on Fenwick tree data structure that helps with
 * querying sums that have time complexity of log n.
 *
 * Fenwick Tree Credits: http://petr-mitrichev.blogspot.com/2013/05/fenwick-tree-range-updates.html
 * https://github.com/mikolalysenko/fenwick-tree
 *
 */
export declare class RowHeightCache {
    /**
     * Tree Array stores the cumulative information of the row heights to perform efficient
     * range queries and updates.  Currently the tree is initialized to the base row
     * height instead of the detail row height.
     */
    private treeArray;
    /**
     * Clear the Tree array.
     */
    clearCache(): void;
    /**
     * Initialize the Fenwick tree with row Heights.
     *
     * @param rows The array of rows which contain the expanded status.
     * @param rowHeight The row height.
     * @param detailRowHeight The detail row height.
     */
    initCache(details: any): void;
    /**
     * Given the ScrollY position i.e. sum, provide the rowIndex
     * that is present in the current view port.  Below handles edge cases.
     */
    getRowIndex(scrollY: number): number;
    /**
     * When a row is expanded or rowHeight is changed, update the height.  This can
     * be utilized in future when Angular Data table supports dynamic row heights.
     */
    update(atRowIndex: number, byRowHeight: number): void;
    /**
     * Range Sum query from 1 to the rowIndex
     */
    query(atIndex: number): number;
    /**
     * Find the total height between 2 row indexes
     */
    queryBetween(atIndexA: number, atIndexB: number): number;
    /**
     * Given the ScrollY position i.e. sum, provide the rowIndex
     * that is present in the current view port.
     */
    private calcRowIndex(sum);
}
