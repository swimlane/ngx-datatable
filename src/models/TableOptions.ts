import { TableColumn } from './TableColumn';
import { Sort } from './Sort';

import { ColumnMode } from './ColumnMode';
import { SortType } from './SortType';
import { SelectionType } from './SelectionType';

export class TableOptions {

  // Columns
  columns: Array<TableColumn>;

  // Enable vertical scrollbars
  scrollbarV: boolean = false;

  // Enable horz scrollbars
  scrollbarH: boolean = false;

  // The row height; which is necessary
  // to calculate the height for the lazy rendering.
  rowHeight: number = 30;

  // flex
  // force
  // standard
  columnMode: ColumnMode = ColumnMode.standard;

  // Loading message presented when the array is undefined
  loadingMessage: string = 'Loading...';

  // Message to show when array is presented
  // but contains no values
  emptyMessage: string = 'No data to display';

  // The minimum header height in pixels.
  // pass falsey for no header
  headerHeight: number = 30;

  // The minimum footer height in pixels.
  // pass falsey for no footer
  footerHeight: number = 0;

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

  constructor(props: any) {
    Object.assign(this, props);
  }

}
