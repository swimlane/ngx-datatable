import { Injectable, EventEmitter } from '@angular/core';

import { columnsByPin, columnGroupWidths } from '../utils/column';
import { scrollbarWidth } from '../utils/scrollbarWidth';
import { nextSortDir, sortRows } from '../utils/sort';

import { TableOptions } from '../models/TableOptions';
import { TableColumn } from '../models/TableColumn';
import { Sort } from '../models/Sort';
import { SortType } from '../enums/SortType';

import * as _ from 'lodash';

@Injectable()
export class StateService {

  onSelectionChange: EventEmitter<any> = new EventEmitter();
  onRowsUpdate: EventEmitter<any> = new EventEmitter();
  onPageChange: EventEmitter<any> = new EventEmitter();

  private options = new Map<string, TableOptions>();
  private rows = new Map<string, Array<any>>();
  private selected = new Map<string, Array<any>>();

  private scrollbarWidth = new Map<string, number>();
  private offsetX = new Map<string, number>();
  private offsetY = new Map<string, number>();
  private innerWidth = new Map<string, number>();
  private bodyHeight = new Map<string, number>();

  newInstance() {
    let key = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = Math.random() * 16 | 0;
      let v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    this.bodyHeight.set(key, 300);
    this.offsetX.set(key, 0);
    this.offsetY.set(key, 0);
    this.innerWidth.set(key, 0);
    this.scrollbarWidth.set(key, scrollbarWidth());
    return key;
  }

  getScrollbarWidth(key: string) {
    return this.scrollbarWidth.get(key);
  }

  setScollbarWidth(key: string, value: any) {
    this.scrollbarWidth.set(key, value);
    return this;
  }

  getOffsetX(key: string) {
    return this.offsetX.get(key);
  }

  setOffsetX(key: string, value: any) {
    this.offsetX.set(key, value);
    return this;
  }

  getOffsetY(key: string) {
    return this.offsetY.get(key);
  }

  setOffsetY(key: string, value: any) {
    this.offsetY.set(key, value);
    return this;
  }

  getInnerWidth(key: string) {
    return this.innerWidth.get(key);
  }

  setInnerWidth(key: string, value: any) {
    this.innerWidth.set(key, value);
    return this;
  }

  getBodyHeight(key: string) {
    return this.bodyHeight.get(key);
  }

  setBodyHeight(key: string, value: any) {
    this.bodyHeight.set(key, value);
    return this;
  }

  columnsByPin(key: string) {
    return columnsByPin(this.getOption(key, 'columns'));
  }

  columnGroupWidths(key: string) {
    return columnGroupWidths(this.columnsByPin(key), this.getOption(key, 'columns'));
  }

  rowCount(key: string) {
    if (!this.getOption(key, 'externalPaging')) {
      return this.rows.get(key).length;
    } else {
      return this.getOption(key, 'count');
    }
  }

  getRows(key) {
    return this.rows.get(key);
  }

  pageSize(key: string) {
    if (this.getOption(key, 'scrollbarV')) {
      return Math.ceil(this.getBodyHeight(key) / this.getOption(key, 'rowHeight')) + 1;
    } else if (this.getOption(key, 'limit')) {
      return this.getOption(key, 'limit');
    } else {
      return this.rows.get(key).length;
    }
  }

  indexes(key: string) {
    let first = 0;
    let last = 0;

    if (this.getOption(key, 'scrollbarV')) {
      const floor = Math.floor((this.getOffsetY(key) || 0) / this.getOption(key, 'rowHeight'));
      first = Math.max(floor, 0);
      last = Math.min(first + this.pageSize(key), this.rowCount(key));
    } else {
      first = Math.max(this.getOption(key, 'offset') * this.pageSize(key), 0);
      last = Math.min(first + this.pageSize(key), this.rowCount(key));
    }

    return { first, last };
  }

  setSelected(key: string, selected: any[]) {
    if (!this.selected.get(key)) {
      this.selected.set(key, selected || []);
    } else {
      let selectedArray = this.selected.get(key);
      selected.splice(0, selected.length);
      selectedArray.push(...selected);
      this.selected.set(key, selectedArray);
    }

    this.onSelectionChange.emit(this.selected);
    return this;
  }

  getSelected(key: string) {
    return this.selected.get(key);
  }

  setRows(key: string, rows: Array<any>) {
    if (rows) {
      this.rows.set(key, [...rows]);
      this.onRowsUpdate.emit(rows);
    }
    return this;
  }

  setOptions(key: string, options: TableOptions) {
    this.options.set(key, options);
    return this;
  }

  addOption(key: string, option) {
    let options = this.options.get(key);
    _.extend(options, option);
    this.options.set(key, options);
    return this;
  }

  getOption(key: string, option) {
    let options = this.options.get(key);
    return options[option];
  }

  updateOption(key: string, option: string, value) {
    let options = this.options.get(key);
    let obj = {};
    obj[option] = value;
    _.merge(options, obj);
    this.options.set(key, options);
    return this;
  }

  getOptions(key: string) {
    return this.options.get(key);
  }

  setPage(key: string, { type, value }) {
    this.updateOption(key, 'offset', value - 1);

    this.onPageChange.emit({
      type,
      offset: this.getOption(key, 'offset'),
      limit: this.pageSize(key),
      count: this.rowCount(key)
    });
  }

  nextSort(key: string, column: TableColumn) {
    const idx = this.getOption(key, 'sorts').findIndex(s => {
      return s.prop === column.prop;
    });

    let currentSort = this.getOption(key, 'sorts');

    let curSort = currentSort[idx];
    let curDir = undefined;
    if (curSort) curDir = curSort.dir;

    const dir = nextSortDir(this.getOption(key, 'sortType'), curDir);
    if (dir === undefined) {
      currentSort.splice(idx, 1);
    } else if (curSort) {
      currentSort[idx].dir = dir;
    } else {
      if (this.getOption(key, 'sortType') === SortType.single) {
        currentSort.splice(0, currentSort.length);
      }

      currentSort.push(new Sort({dir, prop: column.prop}));
    }

    console.debug('Current Sort', currentSort);
    this.updateOption(key, 'sorts', currentSort);

    if (!column.comparator) {
      let rows = this.rows.get(key);
      this.setRows(key, sortRows(rows, currentSort));
    } else {
      column.comparator(this.rows, currentSort);
    }
  }

}
