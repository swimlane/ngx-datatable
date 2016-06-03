export class TableOptions {

  // Enable vertical scrollbars
  scrollbarV = true;

  // Enable horz scrollbars
  // scrollbarH = true;

  // The row height; which is necessary
  // to calculate the height for the lazy rendering.
  rowHeight = 30;

  // flex
  // force
  // standard
  columnMode = 'standard';

  // Loading message presented when the array is undefined
  loadingMessage = 'Loading...';

  // Message to show when array is presented
  // but contains no values
  emptyMessage = 'No data to display';

  // The minimum header height in pixels.
  // pass falsey for no header
  headerHeight = 30;

  // The minimum footer height in pixels.
  // pass falsey for no footer
  footerHeight = 0;

  // if external paging is turned on
  externalPaging = false;

  // Page size
  limit = undefined;

  // Total count
  count = 0;

  // Page offset
  offset = 0;

  // Loading indicator
  loadingIndicator = false;

  // if users can select itmes
  selectable = false;

  // if users can select mutliple items
  multiSelect = false;

  // checkbox selection vs row click
  checkboxSelection = false;

  // if you can reorder columns
  reorderable = true;

  constructor(props) {
    Object.assign(this, props);
  }

}
