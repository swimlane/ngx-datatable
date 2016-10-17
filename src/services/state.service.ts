import { Injectable, EventEmitter } from '@angular/core';

import { columnsByPin, columnGroupWidths, scrollbarWidth, nextSortDir, sortRows } from '../utils';
import { TableOptions, TableColumn, Sort } from '../models';
import { SortType } from '../types';
import { RowHeightCache } from '../utils/row-height-cache';

@Injectable()
export class StateService {

  options: TableOptions;
  rows: Array<any> = [];
  selected: Array<any> = [];
  /**
   * Cache the row heights for calculation during virtual scroll.
   * @type {RowHeightCache}
   */
  rowHeightsCache = new RowHeightCache();

  onSortChange: EventEmitter<any> = new EventEmitter();
  onSelectionChange: EventEmitter<any> = new EventEmitter();
  onRowsUpdate: EventEmitter<any> = new EventEmitter();
  onPageChange: EventEmitter<any> = new EventEmitter();

  /**
   * Event emitted whenever there is a change in row expansion state.
   * @type {EventEmitter}
   */
  onExpandChange: EventEmitter<any> = new EventEmitter();

  scrollbarWidth: number = scrollbarWidth();
  offsetX: number = 0;
  offsetY: number = 0;
  innerWidth: number = 0;

  // this body height is a placeholder
  // its only used internally, if you
  // need to set the tables element style height
  bodyHeight: number = 300;

  get columnsByPin() {
    return columnsByPin(this.options.columns);
  }

  get columnGroupWidths() {
    return columnGroupWidths(this.columnsByPin, this.options.columns);
  }

  get rowCount(): number {
    if (!this.options.externalPaging) {
      return this.rows.length;
    } else {
      return this.options.count;
    }
  }

  /**
   * Property that would calculate the height of scroll bar
   * based on the row heights cache.
   */
  get scrollHeight(): number {
    return this.rowHeightsCache.query(this.rowCount - 1);
  }

  get pageSize(): number {
    if (this.options.scrollbarV) {
      // Keep the page size constant even if the row has been expanded.
      // This is because an expanded row is still considered to be a child of
      // the original row.  Hence calculation would use rowHeight only.
      return Math.ceil(this.bodyHeight / this.options.rowHeight);
    } else if (this.options.limit) {
      return this.options.limit;
    } else {
      return this.rows.length;
    }
  }

  get indexes() {
    let first = 0;
    let last = 0;

    if (this.options.scrollbarV) {
      // const floor = Math.floor((this.offsetY || 0) / this.options.rowHeight);
      // first = Math.max(floor, 0);
      // last = Math.min(first + this.pageSize, this.rowCount);
      //
      // console.log('first ==> ' + first + ' last ==> ' + last);

      // Calculation of the first and last indexes will be based on where the
      // scrollY position would be at.  The last index would be the one
      // that shows up inside the view port the last.
      first = this.rowHeightsCache.getRowIndex(this.offsetY);
      last = this.rowHeightsCache.getRowIndex(this.bodyHeight + this.offsetY) + 1;
      // console.log('first ==> ' + first + ' last ==> ' + last);
    } else {
      first = Math.max(this.options.offset * this.pageSize, 0);
      last = Math.min(first + this.pageSize, this.rowCount);
    }

    return { first, last };
  }

  setSelected(selected: any[]): StateService {
    if (!this.selected) {
      this.selected = selected || [];
    } else {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
    }

    this.onSelectionChange.emit(this.selected);
    return this;
  }

  /**
   *  Refreshes the full Row Height cache.  Should be used
   *  when the entire row array state has changed.
   */
  refreshRowHeightCache() {

    // clear the previous row height cache if already present.
    // this is useful during sorts, filters where the state of the
    // rows array is changed.
    this.rowHeightsCache.clearCache();
    // Initialize the tree only if there are rows inside the tree.
    if ( this.rows.length > 0 ) {
      this.rowHeightsCache.initCache( this.rows,
        this.options.rowHeight,
        this.options.detailRowHeight);
    }

  }

  setRows(rows: Array<any>): StateService {
    if (rows) {
      this.rows = [...rows];
      if( this.options ) {
        this.refreshRowHeightCache();
      }
      this.onRowsUpdate.emit(rows);
    }
    return this;
  }

  setOptions(options: TableOptions): StateService {
    this.options = options;
    return this;
  }

  setPage({ type, value }): void {
    this.options.offset = value - 1;

    this.onPageChange.emit({
      type,
      offset: this.options.offset,
      limit: this.pageSize,
      count: this.rowCount
    });
  }

  nextSort(column: TableColumn): void {
    const idx = this.options.sorts.findIndex(s => {
      return s.prop === column.prop;
    });

    let curSort = this.options.sorts[idx];
    let curDir = undefined;
    if (curSort) curDir = curSort.dir;

    const dir = nextSortDir(this.options.sortType, curDir);
    if (dir === undefined) {
      this.options.sorts.splice(idx, 1);
    } else if (curSort) {
      this.options.sorts[idx].dir = dir;
    } else {
      if (this.options.sortType === SortType.single) {
        this.options.sorts.splice(0, this.options.sorts.length);
      }

      this.options.sorts.push(new Sort({dir, prop: column.prop}));
    }

    if (!column.comparator) {
      this.setRows(sortRows(this.rows, this.options.sorts));
    } else {
      column.comparator(this.rows, this.options.sorts);
    }

    this.onSortChange.emit({ column });
  }

  getAdjustedViewPortIndex(): number {
    // Capture the row index of the first row that is visible on the viewport.
    // If the scroll bar is just below the row which is highlighted then make that as the
    // first index.
    let viewPortFirstRowIndex =  this.indexes.first;
    let offsetScroll = this.rowHeightsCache.query(viewPortFirstRowIndex - 1);
    return offsetScroll <= this.offsetY ? viewPortFirstRowIndex - 1 : viewPortFirstRowIndex;
  }

  /**
   * Toggle the Expansion of the row i.e. if the row is expanded then it will
   * collapse and vice versa.   Note that the expanded status is stored as
   * a part of the row object itself as we have to preserve the expanded row
   * status in case of sorting and filtering of the row set.
   *
   * @param row The row for which the expansion needs to be toggled.
   */
  toggleRowExpansion(row: any) {
    // Capture the row index of the first row that is visible on the viewport.
    let viewPortFirstRowIndex =  this.getAdjustedViewPortIndex();

    let detailRowHeight = this.options.detailRowHeight * (
        row.$$expanded ? -1 : 1);

    // Update the toggled row and update the heights in the cache.
    row.$$expanded ^= 1 ;
    this.rowHeightsCache.update(row.$$index, detailRowHeight);

    this.onExpandChange.emit({rows: [row], currentIndex: viewPortFirstRowIndex } );
    // Broadcast the event to let know that the rows array has been updated.
    this.onRowsUpdate.emit(this.rows);
  }

  /**
   * Expand/Collapse all the rows no matter what their state is.
   *
   * @param expanded When true, all rows are expanded and when false, all rows will be collapsed.
   */
  toggleAllRows(expanded: boolean) {
    let rowExpanded = expanded ? 1 : 0;
    // Capture the row index of the first row that is visible on the viewport.
    let viewPortFirstRowIndex =  this.getAdjustedViewPortIndex();

    this.rows.forEach( (row: any) => {
      row.$$expanded = rowExpanded;
    });
    // Refresh the full row heights cache since every row was affected.
    this.refreshRowHeightCache();

    // Emit all rows that have been expanded.
    this.onExpandChange.emit({rows: this.rows, currentIndex: viewPortFirstRowIndex });
    // Broadcast the event to let know that the rows array has been updated.
    this.onRowsUpdate.emit(this.rows);
  }

}
