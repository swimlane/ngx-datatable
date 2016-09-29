import { Injectable, EventEmitter } from '@angular/core';

import { columnsByPin, columnGroupWidths, scrollbarWidth, nextSortDir, sortRows } from '../utils';
import { TableOptions, TableColumn, Sort } from '../models';
import { SortType } from '../types';

@Injectable()
export class StateService {

  options: TableOptions;
  rows: Array<any> = [];
  selected: Array<any> = [];

  onSortChange: EventEmitter<any> = new EventEmitter();
  onSelectionChange: EventEmitter<any> = new EventEmitter();
  onRowsUpdate: EventEmitter<any> = new EventEmitter();
  onPageChange: EventEmitter<any> = new EventEmitter();

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

  get pageSize(): number {
    if (this.options.scrollbarV) {
      return Math.ceil(this.bodyHeight / this.options.rowHeight) + 1;
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
      const floor = Math.floor((this.offsetY || 0) / this.options.rowHeight);
      first = Math.max(floor, 0);
      last = Math.min(first + this.pageSize, this.rowCount);
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

  setRows(rows: Array<any>): StateService {
    if (rows) {
      this.rows = [...rows];
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

}
