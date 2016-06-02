import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { id } from '../utils/id';
import { camelCase } from '../utils/camelCase';
import { columnsByPin, columnGroupWidths } from '../utils/column';
import { scrollbarWidth } from '../utils/scrollbarWidth';

import { tableDefaults } from '../constants/defaults';
import { columnDefaults } from '../constants/columnDefaults';

@Injectable()
export class StateService {

  options: Object;
  rows: Observer<Object[]>;
  selected: Observer<Object[]>;

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
      return this.rows.array.length;
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

  get paginated() {
    let { first, last } = this.indexes;
    return this.rows
      .skip(first)
      .take(last)
      .toArray();
  }

  setSelected(selected) {
    this.selected = Observable.from(selected);
    return this;
  }

  setRows(rows) {
    this.rows = Observable.from(rows);
    return this;
  }

  setOptions(options) {
    this.transposeDefaults(options);
    this.options = options;
    return this;
  }

  setPage({ page }) {
    this.options.offset = page - 1;
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
