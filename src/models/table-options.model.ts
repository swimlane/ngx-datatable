import { TableColumn } from './table-column.model';
import { Sort } from './sort.model';
import { ColumnMode, SortType, SelectionType } from '../types';
import { TemplateRef } from '@angular/core';

export class TableOptions {

  // Columns
  columns: TableColumn[] = [];

  // Enable vertical scrollbars
  scrollbarV: boolean = false;

  // Enable horz scrollbars
  scrollbarH: boolean = false;

  // The row height; which is necessary
  // to calculate the height for the lazy rendering.
  rowHeight: number = 30;

  // The detail row height is required especially when virtual scroll is enabled.
  detailRowHeight: number = 0;

  // flex
  // force
  // standard
  columnMode: ColumnMode = ColumnMode.standard;

  // Message to show when array is presented
  // but contains no values
  emptyMessage: string = 'No data to display';

  // The minimum header height in pixels.
  // pass falsey for no header
  // note: number|string does not work right
  headerHeight: any = 30;

  // The minimum footer height in pixels.
  // pass falsey for no footer
  footerHeight: number = 0;

  // The minimum table height in pixels.
  tableHeight: number = 300;

  // if external paging is turned on
  externalPaging: boolean = false;

  // Page size
  limit: number = undefined;

  // Total count
  count: number = 0;

  // Page offset
  offset: number = 0;

  // Loading indicator
  loadingIndicator: boolean = false;

  // Selections?
  selectionType: SelectionType;

  // if you can reorder columns
  reorderable: boolean = true;

  // type of sorting
  sortType: SortType = SortType.single;

  // sorts
  sorts: Array<Sort> = [];

  // row detail template
  rowDetailTemplate: TemplateRef<any>;

  constructor(props: any) {
    Object.assign(this, props);
    this.validate();
  }

  validate() {
    if(this.scrollbarV === true && isNaN(this.rowHeight)) {
      throw new Error('Vertical scrolling and auto row height is not support!');
    }
  }

}
