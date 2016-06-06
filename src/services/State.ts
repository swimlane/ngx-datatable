import { Injectable, EventEmitter } from '@angular/core';

import { columnsByPin, columnGroupWidths } from '../utils/column';
import { scrollbarWidth } from '../utils/scrollbarWidth';
import { nextSortDir, sortRows } from '../utils/sort';

import { TableOptions } from '../models/TableOptions';
import { TableColumn } from '../models/TableColumn';
import { Sort } from '../models/Sort';
import { SortType } from '../models/SortType';

@Injectable()
export class StateService {

  options: TableOptions;
  rows: Array<any>;
  selected: Array<any>;

  onRowsUpdate: EventEmitter = new EventEmitter();
  onPageChange: EventEmitter = new EventEmitter();

  scrollbarWidth: number = scrollbarWidth();
  offsetX: number = 0;
  offsetY: number = 0;
  innerWidth: number = 0;
  bodyHeight: number = 300;

  get columnsByPin() {
    return columnsByPin(this.options.columns);
  }

  get columnGroupWidths() {
    return columnGroupWidths(this.columnsByPin, this.options.columns);
  }

  get pageCount() {
    if(!this.options.externalPaging) {
      return this.rows.length;
    }
    return this.options.count;
  }

  get pageSize() {
    if(this.options.scrollbarV)
      return Math.ceil(this.bodyHeight / this.options.rowHeight) + 1;
    return this.options.limit;
  }

  get indexes() {
    let first = 0, last = 0;

    if(this.options.scrollbarV){
      first = Math.max(Math.floor((
          this.offsetY || 0) / this.options.rowHeight, 0), 0);
      last = Math.min(first + this.pageSize, this.pageCount);
    } else {
      first = Math.max(this.options.offset * this.options.limit, 0);
      last = Math.min(first + this.pageSize, this.pageCount);
    }

    return { first, last };
  }

  setSelected(selected: Array<any>) {
    this.selected = selected;
    return this;
  }

  setRows(rows: Array<any>) {
    this.rows = [...rows];
    this.onRowsUpdate.emit(rows);
    return this;
  }

  setOptions(options: TableOptions) {
    this.options = options;
    return this;
  }

  setPage(page: number) {
    this.options.offset = page - 1;

    this.onPageChange.emit({
      offset: this.options.offset,
      limit: this.pageSize,
      pageCount: this.pageCount
    });
  }

  nextSort(column: TableColumn) {
    const idx = this.options.sorts.findIndex(s =>
      { return s.prop === column.prop });

    let curSort = this.options.sorts[idx];
    let curDir = undefined;
    if(curSort) curDir = curSort.dir;

    const dir = nextSortDir(this.options.sortType, curDir);
    if(dir === undefined) {
      this.options.sorts.splice(idx, 1);
    } else if(curSort) {
      this.options.sorts[idx].dir = dir;
    } else {
      if(this.options.sortType === SortType.single) {
        this.options.sorts.splice(0, this.options.sorts.length);
      }

      this.options.sorts.push(new Sort({ dir, prop: column.prop }));
    }

    if(!column.comparator) {
      this.setRows(sortRows(this.rows, this.options.sorts));
    } else {
      column.comparator(this.rows, this.options.sorts)
    }
  }

}
