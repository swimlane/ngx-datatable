import { TableColumn } from './TableColumn';
import { Sort } from './Sort';
import { ColumnMode } from '../enums/ColumnMode';
import { SortType } from '../enums/SortType';
import { SelectionType } from '../enums/SelectionType';

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

  // This will be used when displaying or selecting rows:
  // when tracking/comparing them, we'll use the value of this fn,
  // instead of comparing the objects directly
  // (`fn(x) === fn(y)` instead of `x === y`)
  rowIdentityFunction = ((x) => x);

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

  // Should we mutate the [selected] array on our own,
  // or just publish the selection events?
  //
  // True is the old behaviour - after selecting the row,
  // it will automatically update the selected's array.
  //
  // If false, DataTable component will just propagate
  // a onSelectionChange event: after that, you will have
  // to change the selected's array value on your own.
  mutateSelectionState: boolean = true;

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
