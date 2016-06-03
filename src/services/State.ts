import { Injectable, EventEmitter } from '@angular/core';

import { id } from '../utils/id';
import { camelCase } from '../utils/camelCase';
import { columnsByPin, columnGroupWidths } from '../utils/column';
import { scrollbarWidth } from '../utils/scrollbarWidth';

import { tableDefaults } from '../constants/defaults';
import { columnDefaults } from '../constants/columnDefaults';

@Injectable()
export class StateService {

  options: Object;
  rows: any;
  selected: any;

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
      //return this.rows.array.length;
      return this.rows.length;
  }

  get pageSize() {
    if(this.options.scrollbarV)
      return Math.ceil(this.bodyHeight / this.options.rowHeight) + 1;

    return this.options.limit;
  }

  get indexes(){
    let first = 0, last = 0;

    if(this.options.scrollbarV){
      first = Math.max(Math.floor((
          this.options.offsetY || 0) / this.options.rowHeight, 0), 0);
      last = Math.min(first + this.pageSize, this.pageCount);
    } else {
      first = Math.max(this.options.offset * this.options.limit, 0);
      last = Math.min(first + this.pageSize, this.pageCount);
    }

    return { first, last };
  }

  /*
  get paginated() {
    let { first, last } = this.indexes;

    return this.rows
      .skip(first)
      .take(last)
      .toArray();
  }
  */

  setSelected(selected) {
    this.selected = Observable.from(selected);
    return this;
  }

  setRows(rows) {
    this.rows = [...rows];
    this.onRowsUpdate.emit(rows);
    return this;
  }

  setOptions(options) {
    this.transposeDefaults(options);
    this.options = options;
    return this;
  }

  setPage({ page }) {
    this.options.offset = page - 1;
    this.onPageChange.emit(this.options.offset);
  }

  transposeDefaults(options) {
    for(const attr in tableDefaults) {
      if(options[attr] === undefined) {
        options[attr] = tableDefaults[attr];
      }
    }

    this.transposeColumnDefaults(options.columns);
  }

  transposeColumnDefaults(columns) {
    for(let column of columns) {
      column.$id = id();

      for(const attr in columnDefaults) {
        if(column[attr] === undefined) {
          column[attr] = columnDefaults[attr];
        }
      }

      if(column.name && !column.prop) {
        column.prop = camelCase(column.name);
      }
    }
  }

}
