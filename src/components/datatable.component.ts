import {
  Component, Input, Output, ElementRef, EventEmitter, ViewChild,
  HostListener, ContentChildren, OnInit, QueryList, AfterViewInit,
  HostBinding, ContentChild, TemplateRef, IterableDiffer,
  DoCheck, KeyValueDiffers, ViewEncapsulation
} from '@angular/core';

import { 
  forceFillColumnWidths, adjustColumnWidths, sortRows, scrollbarWidth, 
  setColumnDefaults, throttleable, translateTemplates
} from '../utils';
import { ColumnMode, SortType, SelectionType } from '../types';
import { DataTableBodyComponent } from './body';
import { DataTableColumnDirective } from './columns';
import { DatatableRowDetailDirective } from './row-detail';

@Component({
  selector: 'ngx-datatable',
  template: `
    <div
      visibility-observer
      (visible)="recalculate()">
      <datatable-header
        *ngIf="headerHeight"
        [sorts]="sorts"
        [sortType]="sortType"
        [scrollbarH]="scrollbarH"
        [innerWidth]="innerWidth"
        [offsetX]="offsetX"
        [columns]="columns"
        [headerHeight]="headerHeight"
        [reorderable]="reorderable"
        [sortAscendingIcon]="cssClasses.sortAscending"
        [sortDescendingIcon]="cssClasses.sortDescending"
        [allRowsSelected]="allRowsSelected"
        [selectionType]="selectionType"
        (sort)="onColumnSort($event)"
        (resize)="onColumnResize($event)"
        (reorder)="onColumnReorder($event)"
        (select)="onHeaderSelect($event)">
      </datatable-header>
      <datatable-body
        [rows]="rows"
        [scrollbarV]="scrollbarV"
        [scrollbarH]="scrollbarH"
        [loadingIndicator]="loadingIndicator"
        [rowHeight]="rowHeight"
        [rowCount]="rowCount"
        [offset]="offset"
        [trackByProp]="trackByProp"
        [columns]="columns"
        [pageSize]="pageSize"
        [offsetX]="offsetX"
        [rowDetail]="rowDetail"
        [selected]="selected"
        [innerWidth]="innerWidth"
        [bodyHeight]="bodyHeight"
        [selectionType]="selectionType"
        [emptyMessage]="messages.emptyMessage"
        [rowIdentity]="rowIdentity"
        [selectCheck]="selectCheck"
        (page)="onBodyPage($event)"
        (activate)="activate.emit($event)"
        (rowContextmenu)="rowContextmenu.emit($event)"
        (select)="onBodySelect($event)"
        (scroll)="onBodyScroll($event)">
      </datatable-body>
      <datatable-footer
        *ngIf="footerHeight"
        [rowCount]="rowCount"
        [pageSize]="pageSize"
        [offset]="offset"
        [footerHeight]="footerHeight"
        [totalMessage]="messages.totalMessage"
        [pagerLeftArrowIcon]="cssClasses.pagerLeftArrow"
        [pagerRightArrowIcon]="cssClasses.pagerRightArrow"
        [pagerPreviousIcon]="cssClasses.pagerPrevious"
        [pagerNextIcon]="cssClasses.pagerNext"
        (page)="onFooterPage($event)">
      </datatable-footer>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./datatable.component.scss'],
  host: {
    class: 'ngx-datatable'
  }
})
export class DatatableComponent implements OnInit, AfterViewInit, DoCheck {

  /**
   * Rows that are displayed in the table.
   * 
   * @memberOf DatatableComponent
   */
  @Input() set rows(val: any) {
    // auto sort on new updates
    if (!this.externalSorting) {
      val = sortRows(val, this.columns, this.sorts);
    }

    this._rows = val;

    // recalculate sizes/etc
    this.recalculate();
  }

  /**
   * Gets the rows.
   * 
   * @readonly
   * @type {*}
   * @memberOf DatatableComponent
   */
  get rows(): any {
    return this._rows;
  }

  /**
   * Columns to be displayed.
   * 
   * @memberOf DatatableComponent
   */
  @Input() set columns(val: any[]) {
    if(val) {
      setColumnDefaults(val);
      this.recalculateColumns(val);
    }

    this._columns = val;
  }

  /**
   * Get the columns.
   * 
   * @readonly
   * @type {any[]}
   * @memberOf DatatableComponent
   */
  get columns(): any[] {
    return this._columns;
  }

  /**
   * List of row objects that should be 
   * represented as selected in the grid. 
   * Default value: `[]`
   * 
   * @type {any[]}
   * @memberOf DatatableComponent
   */
  @Input() selected: any[] = [];

  /**
   * Enable vertical scrollbars
   * 
   * @type {boolean}
   * @memberOf DatatableComponent
   */
  @Input() scrollbarV: boolean = false;

  /**
   * Enable horz scrollbars
   * 
   * @type {boolean}
   * @memberOf DatatableComponent
   */
  @Input() scrollbarH: boolean = false;

  /**
   * The row height; which is necessary
   * to calculate the height for the lazy rendering.
   * 
   * @type {number}
   * @memberOf DatatableComponent
   */
  @Input() rowHeight: number = 30;

  /**
   * Type of column width distribution formula.
   * Example: flex, force, standard
   * 
   * @type {ColumnMode}
   * @memberOf DatatableComponent
   */
  @Input() columnMode: ColumnMode = ColumnMode.standard;

  /**
   * The minimum header height in pixels.
   * Pass a falsey for no header
   * 
   * @type {*}
   * @memberOf DatatableComponent
   */
  @Input() headerHeight: any = 30;

  /**
   * The minimum footer height in pixels.
   * Pass falsey for no footer
   * 
   * @type {number}
   * @memberOf DatatableComponent
   */
  @Input() footerHeight: number = 0;

  /**
   * If the table should use external paging
   * otherwise its assumed that all data is preloaded.
   * 
   * @type {boolean}
   * @memberOf DatatableComponent
   */
  @Input() externalPaging: boolean = false;

  /**
   * If the table should use external sorting or
   * the built-in basic sorting.
   * 
   * @type {boolean}
   * @memberOf DatatableComponent
   */
  @Input() externalSorting: boolean = false;

  /**
   * The page size to be shown. 
   * Default value: `undefined`
   * 
   * @type {number}
   * @memberOf DatatableComponent
   */
  @Input() limit: number = undefined;

  /**
   * The total count of all rows. 
   * Default value: `0`
   * 
   * @type {number}
   * @memberOf DatatableComponent
   */
  @Input() set count(val: number) {
    this._count = val;

    // recalculate sizes/etc
    this.recalculate();
  }

  /**
   * Gets the count.
   * 
   * @readonly
   * @type {number}
   * @memberOf DatatableComponent
   */
  get count(): number {
    return this._count;
  }

  /**
   * The current offset ( page - 1 ) shown. 
   * Default value: `0`
   * 
   * @type {number}
   * @memberOf DatatableComponent
   */
  @Input() offset: number = 0;

  /**
   * Show the linear loading bar. 
   * Default value: `false`
   * 
   * @type {boolean}
   * @memberOf DatatableComponent
   */
  @Input() loadingIndicator: boolean = false;

  /**
   * Type of row selection. Options are: 
   * 
   *  - `single`
   *  - `multi`
   *  - `chkbox`
   *  - `multiClick`
   * 
   * For no selection pass a `falsey`. 
   * Default value: `undefined`
   * 
   * @type {SelectionType}
   * @memberOf DatatableComponent
   */
  @Input() selectionType: SelectionType;

  /**
   * Enable/Disable ability to re-order columns
   * by dragging them.
   * 
   * @type {boolean}
   * @memberOf DatatableComponent
   */
  @Input() reorderable: boolean = true;

  /**
   * The type of sorting
   * 
   * @type {SortType}
   * @memberOf DatatableComponent
   */
  @Input() sortType: SortType = SortType.single;

  /**
   * Array of sorted columns by property and type. 
   * Default value: `[]`
   * 
   * @type {any[]}
   * @memberOf DatatableComponent
   */
  @Input() sorts: any[] = [];

  /**
   * Css class overrides
   * 
   * @type {*}
   * @memberOf DatatableComponent
   */
  @Input() cssClasses: any = {
    sortAscending: 'icon-down',
    sortDescending: 'icon-up',
    pagerLeftArrow: 'icon-left',
    pagerRightArrow: 'icon-right',
    pagerPrevious: 'icon-prev',
    pagerNext: 'icon-skip'
  };

  /**
   * Message overrides for localization
   * 
   * @type {*}
   * @memberOf DatatableComponent
   */
  @Input() messages: any = {
    // Message to show when array is presented
    // but contains no values
    emptyMessage: 'No data to display',

    // Footer total message
    totalMessage: 'total'
  };

  /**
   * This will be used when displaying or selecting rows.
   * when tracking/comparing them, we'll use the value of this fn,
   * 
   * (`fn(x) === fn(y)` instead of `x === y`)
   * 
   * @memberOf DatatableComponent
   */
  @Input() rowIdentity: (x: any) => any = ((x: any) => x);

  /**
   * A boolean/function you can use to check whether you want
   * to select a particular row based on a criteria. Example:
   * 
   *    (selection) => { 
   *      return selection !== 'Ethel Price'; 
   *    }
   * 
   * @type {*}
   * @memberOf DatatableComponent
   */
  @Input() selectCheck: any;

  /**
   * Property to which you can use for custom tracking of rows.
   * Example: 'name'
   * 
   * @type {string}
   * @memberOf DatatableComponent
   */
  @Input() trackByProp: string;

  /**
   * Body was scrolled typically in a `scrollbarV:true` scenario.
   * 
   * @type {EventEmitter<any>}
   * @memberOf DatatableComponent
   */
  @Output() scroll: EventEmitter<any> = new EventEmitter();

  /**
   * A cell or row was focused via keyboard or mouse click.
   * 
   * @type {EventEmitter<any>}
   * @memberOf DatatableComponent
   */
  @Output() activate: EventEmitter<any> = new EventEmitter();

  /**
   * A cell or row was selected.
   * 
   * @type {EventEmitter<any>}
   * @memberOf DatatableComponent
   */
  @Output() select: EventEmitter<any> = new EventEmitter();

  /**
   * Column sort was invoked.
   * 
   * @type {EventEmitter<any>}
   * @memberOf DatatableComponent
   */
  @Output() sort: EventEmitter<any> = new EventEmitter();

  /**
   * The table was paged either triggered by the pager or the body scroll.
   * 
   * @type {EventEmitter<any>}
   * @memberOf DatatableComponent
   */
  @Output() page: EventEmitter<any> = new EventEmitter();

  /**
   * Columns were re-ordered.
   * 
   * @type {EventEmitter<any>}
   * @memberOf DatatableComponent
   */
  @Output() reorder: EventEmitter<any> = new EventEmitter();

  /**
   * Column was resized.
   * 
   * @type {EventEmitter<any>}
   * @memberOf DatatableComponent
   */
  @Output() resize: EventEmitter<any> = new EventEmitter();

  /**
   * The context menu was invoked on a row.
   * 
   * @memberOf DatatableComponent
   */
  @Output() rowContextmenu = new EventEmitter<{ event: MouseEvent, row: any }>(false);

  /**
   * CSS class applied if the header height if fixed height.
   * 
   * @readonly
   * @type {boolean}
   * @memberOf DatatableComponent
   */
  @HostBinding('class.fixed-header')
  get isFixedHeader(): boolean {
    const headerHeight: number|string = this.headerHeight;
    return (typeof headerHeight === 'string') ?
      (<string>headerHeight) !== 'auto' : true;
  }

  /**
   * CSS class applied to the root element if
   * the row heights are fixed heights.
   * 
   * @readonly
   * @type {boolean}
   * @memberOf DatatableComponent
   */
  @HostBinding('class.fixed-row')
  get isFixedRow(): boolean {
    const rowHeight: number|string = this.rowHeight;
    return (typeof rowHeight === 'string') ?
      (<string>rowHeight) !== 'auto' : true;
  }

  /**
   * CSS class applied to root element if
   * vertical scrolling is enabled.
   * 
   * @readonly
   * @type {boolean}
   * @memberOf DatatableComponent
   */
  @HostBinding('class.scroll-vertical')
  get isVertScroll(): boolean {
    return this.scrollbarV;
  }

  /**
   * CSS class applied to the root element
   * if the horziontal scrolling is enabled.
   * 
   * @readonly
   * @type {boolean}
   * @memberOf DatatableComponent
   */
  @HostBinding('class.scroll-horz')
  get isHorScroll(): boolean {
    return this.scrollbarH;
  }

  /**
   * CSS class applied to root element is selectable.
   * 
   * @readonly
   * @type {boolean}
   * @memberOf DatatableComponent
   */
  @HostBinding('class.selectable')
  get isSelectable(): boolean {
    return this.selectionType !== undefined;
  }

  /**
   * CSS class applied to root is checkbox selection.
   * 
   * @readonly
   * @type {boolean}
   * @memberOf DatatableComponent
   */
  @HostBinding('class.checkbox-selection')
  get isCheckboxSelection(): boolean {
    return this.selectionType === SelectionType.checkbox;
  }

  /**
   * CSS class applied to root if cell selection.
   * 
   * @readonly
   * @type {boolean}
   * @memberOf DatatableComponent
   */
  @HostBinding('class.cell-selection')
  get isCellSelection(): boolean {
    return this.selectionType === SelectionType.cell;
  }

  /**
   * CSS class applied to root if single select.
   * 
   * @readonly
   * @type {boolean}
   * @memberOf DatatableComponent
   */
  @HostBinding('class.single-selection')
  get isSingleSelection(): boolean {
    return this.selectionType === SelectionType.single;
  }
  
  /**
   * CSS class added to root element if mulit select
   * 
   * @readonly
   * @type {boolean}
   * @memberOf DatatableComponent
   */
  @HostBinding('class.multi-selection')
  get isMultiSelection(): boolean {
    return this.selectionType === SelectionType.multi;
  }

  /**
   * CSS class added to root element if mulit click select
   * 
   * @readonly
   * @type {boolean}
   * @memberOf DatatableComponent
   */
  @HostBinding('class.multi-click-selection')
  get isMultiClickSelection(): boolean {
    return this.selectionType === SelectionType.multiClick;
  }

  /**
   * Column templates gathered from `ContentChildren`
   * if described in your markup.
   * 
   * @memberOf DatatableComponent
   */
  @ContentChildren(DataTableColumnDirective)
  set columnTemplates(val: QueryList<DataTableColumnDirective>) {
    this._columnTemplates = val;

    if(val) {
      // only set this if results were brought back
      const arr = val.toArray();

      if(arr.length) {
        // translate them to normal objects
        this.columns = translateTemplates(arr);
      }
    }
  }

  /**
   * Returns the column templates.
   * 
   * @readonly
   * @type {QueryList<DataTableColumnDirective>}
   * @memberOf DatatableComponent
   */
  get columnTemplates(): QueryList<DataTableColumnDirective> {
    return this._columnTemplates;
  }

  /**
   * Row Detail templates gathered from the ContentChild
   * 
   * @memberOf DatatableComponent
   */
  @ContentChild(DatatableRowDetailDirective)
  rowDetail: DatatableRowDetailDirective;

  /**
   * Reference to the body component for manually
   * invoking functions on the body.
   * 
   * @private
   * @type {DataTableBodyComponent}
   * @memberOf DatatableComponent
   */
  @ViewChild(DataTableBodyComponent)
  bodyComponent: DataTableBodyComponent;

  /**
   * Returns if all rows are selected.
   * 
   * @readonly
   * @private
   * @type {boolean}
   * @memberOf DatatableComponent
   */
  get allRowsSelected(): boolean {
    return this.selected &&
      this.rows &&
      this.selected.length === this.rows.length;
  }

  element: HTMLElement;
  innerWidth: number;
  pageSize: number;
  bodyHeight: number;
  rowCount: number;
  offsetX: number = 0;
  rowDiffer: IterableDiffer;
  _count: number = 0;

  _rows: any[];
  _columns: any[];
  _columnTemplates: QueryList<DataTableColumnDirective>;

  constructor(element: ElementRef, differs: KeyValueDiffers) {
    // get ref to elm for measuring
    this.element = element.nativeElement;
    this.rowDiffer = differs.find({}).create(null);
  }

  /**
   * Lifecycle hook that is called after data-bound 
   * properties of a directive are initialized.
   * 
   * @memberOf DatatableComponent
   */
  ngOnInit(): void {
    // need to call this immediatly to size
    // if the table is hidden the visibility
    // listener will invoke this itself upon show
    this.recalculate();
  }

  /**
   * Lifecycle hook that is called after a component's 
   * view has been fully initialized.
   * 
   * @memberOf DatatableComponent
   */
  ngAfterViewInit(): void {
    // this has to be done to prevent the change detection
    // tree from freaking out because we are readjusting
    setTimeout(() => this.recalculate());
  }

  /**
   * Lifecycle hook that is called when Angular dirty checks a directive.
   * 
   * @memberOf DatatableComponent
   */
  ngDoCheck(): void {
    if (this.rowDiffer.diff(this.rows)) {
      this.recalculatePages();
    }
  }

  /**
   * Recalc's the sizes of the grid.
   * 
   * Updated automatically on changes to:
   * 
   *  - Columns
   *  - Rows
   *  - Paging related
   * 
   * Also can be manually invoked or upon window resize.
   * 
   * @memberOf DatatableComponent
   */
  recalculate(): void {
    this.recalculateDims();
    this.recalculateColumns();
  }

  /**
   * Window resize handler to update sizes.
   * 
   * @memberOf DatatableComponent
   */
  @HostListener('window:resize')
  @throttleable(5)
  onWindowResize(): void {
    this.recalculate();
  }

  /**
   * Recalulcates the column widths based on column width
   * distribution mode and scrollbar offsets.
   * 
   * @param {any[]} [columns=this.columns]
   * @param {number} [forceIdx=false]
   * @param {boolean} [allowBleed=this.scrollH]
   * @returns {any[]}
   * 
   * @memberOf DatatableComponent
   */
  recalculateColumns(
    columns: any[] = this.columns, 
    forceIdx: number = -1, 
    allowBleed: boolean = this.scrollbarH): any[] {

    if (!columns) return;

    let width = this.innerWidth;
    if (this.scrollbarV) {
      width = width - scrollbarWidth;
    }

    if (this.columnMode === ColumnMode.force) {
      forceFillColumnWidths(columns, width, forceIdx, allowBleed);
    } else if (this.columnMode === ColumnMode.flex) {
      adjustColumnWidths(columns, width);
    }

    return columns;
  }

  /**
   * Recalculates the dimensions of the table size.
   * Internally calls the page size and row count calcs too.
   * 
   * @memberOf DatatableComponent
   */
  recalculateDims(): void {
    let { height, width } = this.element.getBoundingClientRect();
    this.innerWidth = Math.floor(width);

    if (this.scrollbarV) {
      if (this.headerHeight) height = height - this.headerHeight;
      if (this.footerHeight) height = height - this.footerHeight;
      this.bodyHeight = height;
    }

    this.recalculatePages();
  }

  /**
   * Recalculates the pages after a update.
   * 
   * 
   * @memberOf DatatableComponent
   */
  recalculatePages(): void {
    this.pageSize = this.calcPageSize();
    this.rowCount = this.calcRowCount();
  }

  /**
   * Body triggered a page event.
   * 
   * @param {*} { offset }
   * 
   * @memberOf DatatableComponent
   */
  onBodyPage({ offset }: any): void {
    this.offset = offset;

    this.page.emit({
      count: this.count,
      pageSize: this.pageSize,
      limit: this.limit,
      offset: this.offset
    });
  }

  /**
   * The body triggered a scroll event.
   * 
   * @param {MouseEvent} event
   * 
   * @memberOf DatatableComponent
   */
  onBodyScroll(event: MouseEvent): void {
    this.offsetX = event.offsetX;
    this.scroll.emit(event);
  }

  /**
   * The footer triggered a page event.
   * 
   * @param {*} event
   * 
   * @memberOf DatatableComponent
   */
  onFooterPage(event: any) {
    this.offset = event.page - 1;
    this.bodyComponent.updateOffsetY(this.offset);

    this.page.emit({
      count: this.count,
      pageSize: this.pageSize,
      limit: this.limit,
      offset: this.offset
    });
  }

  /**
   * Recalculates the sizes of the page
   * 
   * @param {any[]} [val=this.rows]
   * @returns {number}
   * 
   * @memberOf DatatableComponent
   */
  calcPageSize(val: any[] = this.rows): number {
    // Keep the page size constant even if the row has been expanded.
    // This is because an expanded row is still considered to be a child of
    // the original row.  Hence calculation would use rowHeight only.
    if (this.scrollbarV) {
      const size = Math.ceil(this.bodyHeight / this.rowHeight);
      return Math.max(size, 0);
    }

    // if limit is passed, we are paging
    if (this.limit !== undefined) return this.limit;

    // otherwise use row length
    if(val) return val.length;

    // other empty :(
    return 0;
  }

  /**
   * Calculates the row count.
   * 
   * @param {any[]} [val=this.rows]
   * @returns {number}
   * 
   * @memberOf DatatableComponent
   */
  calcRowCount(val: any[] = this.rows): number {
    if(!this.externalPaging) {
      if(!val) return 0;
      return val.length;
    }

    return this.count;
  }

  /**
   * The header triggered a column resize event.
   * 
   * @param {*} { column, newValue }
   * 
   * @memberOf DatatableComponent
   */
  onColumnResize({ column, newValue }: any): void {
    let idx: number;
    let cols = this.columns.map((c, i) => {
      c = Object.assign({}, c);

      if(c.$$id === column.$$id) {
        idx = i;
        c.width = newValue;

        // set this so we can force the column
        // width distribution to be to this value
        c.$$oldWidth = newValue;
      }

      return c;
    });

    this.recalculateColumns(cols, idx);
    this._columns = cols;

    this.resize.emit({
      column,
      newValue
    });
  }

  /**
   * The header triggered a column re-order event.
   * 
   * @param {*} { column, newValue, prevValue }
   * 
   * @memberOf DatatableComponent
   */
  onColumnReorder({ column, newValue, prevValue }: any): void {
    let cols = this.columns.map(c => {
      return Object.assign({}, c);
    });

    cols.splice(prevValue, 1);
    cols.splice(newValue, 0, column);
    this.columns = cols;

    this.reorder.emit({
      column,
      newValue,
      prevValue
    });
  }

  /**
   * The header triggered a column sort event.
   * 
   * @param {*} event
   * 
   * @memberOf DatatableComponent
   */
  onColumnSort(event: any): void {
    const { sorts } = event;

    // this could be optimized better since it will resort
    // the rows again on the 'push' detection...
    if (this.externalSorting === false) {
      // don't use normal setter so we don't resort
      this._rows = sortRows(this.rows, this.columns, sorts);
    }

    this.sorts = sorts;
    this.bodyComponent.updateOffsetY(0);
    this.sort.emit(event);
  }

  /**
   * Toggle all row selection
   * 
   * @param {*} event
   * 
   * @memberOf DatatableComponent
   */
  onHeaderSelect(event: any): void {
    // before we splice, chk if we currently have all selected
    const allSelected = this.selected.length === this.rows.length;

    // remove all existing either way
    this.selected.splice(0, this.selected.length);

    // do the opposite here
    if(!allSelected) {
      this.selected.push(...this.rows);
    }

    this.select.emit({
      selected: this.selected
    });
  }

  /**
   * A row was selected from body
   * 
   * @param {*} event
   * 
   * @memberOf DatatableComponent
   */
  onBodySelect(event: any): void {
    this.select.emit(event);
  }

}
