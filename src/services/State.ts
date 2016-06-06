import { Injectable, EventEmitter } from '@angular/core';

import { TableOptions } from '../models/TableOptions';
import { columnsByPin, columnGroupWidths } from '../utils/column';
import { scrollbarWidth } from '../utils/scrollbarWidth';

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
    if(!this.options.externalPaging)
      return this.rows.length;
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

  setSelected(selected) {
    // this.selected = Observable.from(selected);
    return this;
  }

  setRows(rows) {
    this.rows = [...rows];
    this.onRowsUpdate.emit(rows);
    return this;
  }

  setOptions(options) {
    this.options = options;
    return this;
  }

  setPage({ page }) {
    this.options.offset = page - 1;
    this.onPageChange.emit(this.options.offset);
  }

}
