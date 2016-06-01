import { id } from './utils/id';
import { camelCase } from './utils/camelCase';
import { columnsByPin, columnGroupWidths } from './utils/column';

import { tableDefaults } from './constants/defaults';
import { columnDefaults } from './constants/columnDefaults';

export class State {

  options: Object;
  rows: Array<Object>;
  selected: Array<Object>;

  scrollbarWidth: number;
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
      return this.allRows.length;
  }

  get pageSize() {
    if(this.options.scrollbarV)
      return Math.ceil(this.bodyHeight / this.options.rowHeight) + 1;
    return this.options.limit;
  }

  set rows(val) {
    this.rowsCache = false;
    this.allRows = val;
  }

  get rows() {
    if(this.rowsCache === false) {
      this.rowsCache = this.allRows; //.splice(this.indexes.first, this.indexes.last);
    }

    return this.rowsCache;
  }

  get indexes(){
    let first = 0, last = 0;

    if(this.options.scrollbarV){
      first = Math.max(Math.floor((
          this.options.offsetY || 0) / this.options.rowHeight, 0), 0);
      last = Math.min(first + this.pageSize, this.pageCount);
    } else {
      if(this.options.externalPaging){
        first = Math.max(this.options.offset * this.options.limit, 0);
        last = Math.min(first + this.pageSize, this.pageCount);
      } else {
        last = this.pageSize;
      }
    }

    return { first, last };
  }

  constructor(
    options: Object = {},
    rows: Array<Object> = [],
    selected: Array<Object> = []) {

    this.transposeDefaults(options);
  	Object.assign(this, { options, rows });
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
