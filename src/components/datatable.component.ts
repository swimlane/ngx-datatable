import {
  Component, Input, Output, ElementRef, EventEmitter, ViewChild,
  HostListener, ContentChildren, OnInit, QueryList, AfterViewInit,
  HostBinding, ContentChild, TemplateRef, IterableDiffer,
  DoCheck, KeyValueDiffers, KeyValueDiffer, ViewEncapsulation,
  ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';

import {
  forceFillColumnWidths, adjustColumnWidths, sortRows,
  setColumnDefaults, throttleable, translateTemplates
} from '../utils';
import { ScrollbarHelper } from '../services';
import { ColumnMode, SortType, SelectionType, TableColumn, ContextmenuType } from '../types';
import { DataTableBodyComponent } from './body';
import { DatatableGroupHeaderDirective } from './body/body-group-header.directive';
import { DataTableColumnDirective } from './columns';
import { DatatableRowDetailDirective } from './row-detail';
import { DatatableFooterDirective } from './footer';
import { mouseEvent } from '../events';

@Component({
  selector: 'ngx-datatable',
  template: `
    <div
      visibilityObserver
      (visible)="recalculate()">
      <datatable-header
        *ngIf="headerHeight"
        [sorts]="sorts"
        [sortType]="sortType"
        [scrollbarH]="scrollbarH"
        [innerWidth]="innerWidth"
        [offsetX]="offsetX"
        [dealsWithGroup]="groupedRows"
        [columns]="_internalColumns"
        [headerHeight]="headerHeight"
        [reorderable]="reorderable"
        [sortAscendingIcon]="cssClasses.sortAscending"
        [sortDescendingIcon]="cssClasses.sortDescending"
        [allRowsSelected]="allRowsSelected"
        [selectionType]="selectionType"
        (sort)="onColumnSort($event)"
        (resize)="onColumnResize($event)"
        (reorder)="onColumnReorder($event)"
        (select)="onHeaderSelect($event)"
        (columnContextmenu)="onColumnContextmenu($event)">
      </datatable-header>
      <datatable-body
        [groupRowsBy]="groupRowsBy"
        [groupedRows]="groupedRows"
        [rows]="_internalRows"
        [groupExpansionDefault]="groupExpansionDefault"
        [scrollbarV]="scrollbarV"
        [scrollbarH]="scrollbarH"
        [loadingIndicator]="loadingIndicator"
        [externalPaging]="externalPaging"
        [rowHeight]="rowHeight"
        [rowCount]="rowCount"
        [offset]="offset"
        [trackByProp]="trackByProp"
        [columns]="_internalColumns"
        [pageSize]="pageSize"
        [offsetX]="offsetX"
        [rowDetail]="rowDetail"
        [groupHeader]="groupHeader"
        [selected]="selected"
        [innerWidth]="innerWidth"
        [bodyHeight]="bodyHeight"
        [selectionType]="selectionType"
        [emptyMessage]="messages.emptyMessage"
        [rowIdentity]="rowIdentity"
        [rowClass]="rowClass"
        [selectCheck]="selectCheck"
        (page)="onBodyPage($event)"
        (activate)="activate.emit($event)"
        (rowContextmenu)="onRowContextmenu($event)"
        (select)="onBodySelect($event)"
        (scroll)="onBodyScroll($event)">
      </datatable-body>
      <datatable-footer
        *ngIf="footerHeight"
        [rowCount]="rowCount"
        [pageSize]="pageSize"
        [offset]="offset"
        [footerHeight]="footerHeight"
        [footerTemplate]="footer"
        [totalMessage]="messages.totalMessage"
        [pagerLeftArrowIcon]="cssClasses.pagerLeftArrow"
        [pagerRightArrowIcon]="cssClasses.pagerRightArrow"
        [pagerPreviousIcon]="cssClasses.pagerPrevious"
        [selectedCount]="selected.length"
        [selectedMessage]="!!selectionType && messages.selectedMessage"
        [pagerNextIcon]="cssClasses.pagerNext"
        (page)="onFooterPage($event)">
      </datatable-footer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./datatable.component.scss'],
  host: {
    class: 'ngx-datatable'
  }
})
export class DatatableComponent implements OnInit, DoCheck, AfterViewInit {

  /**
   * Rows that are displayed in the table.
   */
  @Input() set rows(val: any) {
    this._rows = val;
    
    // auto sort on new updates
    if (!this.externalSorting) {
      this._internalRows = sortRows(val, this._internalColumns, this.sorts);
    } else {
      this._internalRows = [...val];
    }
    
    // recalculate sizes/etc
    this.recalculate();

    if (this._rows && this._groupRowsBy) {
      // If a column has been specified in _groupRowsBy created a new array with the data grouped by that row
      this.groupedRows = this.groupArrayBy(this._rows, this._groupRowsBy);
    }

    this.cd.markForCheck();
  }

  /**
   * Gets the rows.
   */
  get rows(): any {
    return this._rows;
  }

  /**
   * This attribute allows the user to set the name of the column to group the data with
   */
  @Input() set groupRowsBy(val: string) {
    if (val) {
      this._groupRowsBy = val;
      if (this._rows && this._groupRowsBy) {
        // cretes a new array with the data grouped
        this.groupedRows = this.groupArrayBy(this._rows, this._groupRowsBy);
      }
    }
  }

  get groupRowsBy() {
    return this._groupRowsBy;
  }

  /**
   * This attribute allows the user to set a grouped array in the following format:
   *  [
   *    {groupid=1} [
   *      {id=1 name="test1"},
   *      {id=2 name="test2"},
   *      {id=3 name="test3"}
   *    ]},
   *    {groupid=2>[
   *      {id=4 name="test4"},
   *      {id=5 name="test5"},
   *      {id=6 name="test6"}
   *    ]}
   *  ]
   */
  @Input() groupedRows: any[];

  /**
   * Columns to be displayed.
   */
  @Input() set columns(val: TableColumn[]) {
    if (val) {
      this._internalColumns = [...val];
      setColumnDefaults(this._internalColumns);
      this.recalculateColumns();
    }

    this._columns = val;
  }

  /**
   * Get the columns.
   */
  get columns(): TableColumn[] {
    return this._columns;
  }

  /**
   * List of row objects that should be
   * represented as selected in the grid.
   * Default value: `[]`
   */
  @Input() selected: any[] = [];

  /**
   * Enable vertical scrollbars
   */
  @Input() scrollbarV: boolean = false;

  /**
   * Enable horz scrollbars
   */
  @Input() scrollbarH: boolean = false;

  /**
   * The row height; which is necessary
   * to calculate the height for the lazy rendering.
   */
  @Input() rowHeight: number = 30;

  /**
   * Type of column width distribution formula.
   * Example: flex, force, standard
   */
  @Input() columnMode: ColumnMode = ColumnMode.standard;

  /**
   * The minimum header height in pixels.
   * Pass a falsey for no header
   */
  @Input() headerHeight: any = 30;

  /**
   * The minimum footer height in pixels.
   * Pass falsey for no footer
   */
  @Input() footerHeight: number = 0;

  /**
   * If the table should use external paging
   * otherwise its assumed that all data is preloaded.
   */
  @Input() externalPaging: boolean = false;

  /**
   * If the table should use external sorting or
   * the built-in basic sorting.
   */
  @Input() externalSorting: boolean = false;

  /**
   * The page size to be shown.
   * Default value: `undefined`
   */
  @Input() set limit(val: number | undefined) {
    this._limit = val;

    // recalculate sizes/etc
    this.recalculate();
  }

  /**
   * Gets the limit.
   */
  get limit(): number | undefined {
    return this._limit;
  }

  /**
   * The total count of all rows.
   * Default value: `0`
   */
  @Input() set count(val: number) {
    this._count = val;

    // recalculate sizes/etc
    this.recalculate();
  }

  /**
   * Gets the count.
   */
  get count(): number {
    return this._count;
  }

  /**
   * The current offset ( page - 1 ) shown.
   * Default value: `0`
   */
  @Input() set offset(val: number) {
    this._offset = val;
  }
  get offset(): number {
    return Math.max(Math.min(this._offset, Math.ceil(this.rowCount / this.pageSize) - 1), 0);
  }

  /**
   * Show the linear loading bar.
   * Default value: `false`
   */
  @Input() loadingIndicator: boolean = false;

  /**
   * Type of row selection. Options are:
   *
   *  - `single`
   *  - `multi`
   *  - `chkbox`
   *  - `multiClick`
   *  - `cell`
   *
   * For no selection pass a `falsey`.
   * Default value: `undefined`
   */
  @Input() selectionType: SelectionType;

  /**
   * Enable/Disable ability to re-order columns
   * by dragging them.
   */
  @Input() reorderable: boolean = true;

  /**
   * The type of sorting
   */
  @Input() sortType: SortType = SortType.single;

  /**
   * Array of sorted columns by property and type.
   * Default value: `[]`
   */
  @Input() sorts: any[] = [];

  /**
   * Css class overrides
   */
  @Input() cssClasses: any = {
    sortAscending: 'datatable-icon-up',
    sortDescending: 'datatable-icon-down',
    pagerLeftArrow: 'datatable-icon-left',
    pagerRightArrow: 'datatable-icon-right',
    pagerPrevious: 'datatable-icon-prev',
    pagerNext: 'datatable-icon-skip'
  };

  /**
   * Message overrides for localization
   *
   * emptyMessage     [default] = 'No data to display'
   * totalMessage     [default] = 'total'
   * selectedMessage  [default] = 'selected'
   */
  @Input() messages: any = {
    // Message to show when array is presented
    // but contains no values
    emptyMessage: 'No data to display',

    // Footer total message
    totalMessage: 'total',

    // Footer selected message
    selectedMessage: 'selected'
  };

  /**
   * This will be used when displaying or selecting rows.
   * when tracking/comparing them, we'll use the value of this fn,
   *
   * (`fn(x) === fn(y)` instead of `x === y`)
   */
  @Input() rowIdentity: (x: any) => any = ((x: any) => x);

  /**
   * Row specific classes.
   * Similar implementation to ngClass.
   *
   *  [rowClass]="'first second'"
   *  [rowClass]="{ 'first': true, 'second': true, 'third': false }"
   */
  @Input() rowClass: any;

  /**
   * A boolean/function you can use to check whether you want
   * to select a particular row based on a criteria. Example:
   *
   *    (selection) => {
   *      return selection !== 'Ethel Price';
   *    }
   */
  @Input() selectCheck: any;

  /**
   * A boolean you can use to set the detault behaviour of rows and groups
   * whether they will start expanded or not. If ommited the default is NOT expanded.
   *
   */
  @Input() groupExpansionDefault: boolean = false;

  /**
   * Property to which you can use for custom tracking of rows.
   * Example: 'name'
   */
  @Input() trackByProp: string;

  /**
   * Body was scrolled typically in a `scrollbarV:true` scenario.
   */
  @Output() scroll: EventEmitter<any> = new EventEmitter();

  /**
   * A cell or row was focused via keyboard or mouse click.
   */
  @Output() activate: EventEmitter<any> = new EventEmitter();

  /**
   * A cell or row was selected.
   */
  @Output() select: EventEmitter<any> = new EventEmitter();

  /**
   * Column sort was invoked.
   */
  @Output() sort: EventEmitter<any> = new EventEmitter();

  /**
   * The table was paged either triggered by the pager or the body scroll.
   */
  @Output() page: EventEmitter<any> = new EventEmitter();

  /**
   * Columns were re-ordered.
   */
  @Output() reorder: EventEmitter<any> = new EventEmitter();

  /**
   * Column was resized.
   */
  @Output() resize: EventEmitter<any> = new EventEmitter();

  /**
   * The context menu was invoked on the table.
   * type indicates whether the header or the body was clicked.
   * content contains either the column or the row that was clicked.
   */
  @Output() tableContextmenu = new EventEmitter<{ event: MouseEvent, type: ContextmenuType, content: any }>(false);

  /**
   * CSS class applied if the header height if fixed height.
   */
  @HostBinding('class.fixed-header')
  get isFixedHeader(): boolean {
    const headerHeight: number | string = this.headerHeight;
    return (typeof headerHeight === 'string') ?
      (<string>headerHeight) !== 'auto' : true;
  }

  /**
   * CSS class applied to the root element if
   * the row heights are fixed heights.
   */
  @HostBinding('class.fixed-row')
  get isFixedRow(): boolean {
    const rowHeight: number | string = this.rowHeight;
    return (typeof rowHeight === 'string') ?
      (<string>rowHeight) !== 'auto' : true;
  }

  /**
   * CSS class applied to root element if
   * vertical scrolling is enabled.
   */
  @HostBinding('class.scroll-vertical')
  get isVertScroll(): boolean {
    return this.scrollbarV;
  }

  /**
   * CSS class applied to the root element
   * if the horziontal scrolling is enabled.
   */
  @HostBinding('class.scroll-horz')
  get isHorScroll(): boolean {
    return this.scrollbarH;
  }

  /**
   * CSS class applied to root element is selectable.
   */
  @HostBinding('class.selectable')
  get isSelectable(): boolean {
    return this.selectionType !== undefined;
  }

  /**
   * CSS class applied to root is checkbox selection.
   */
  @HostBinding('class.checkbox-selection')
  get isCheckboxSelection(): boolean {
    return this.selectionType === SelectionType.checkbox;
  }

  /**
   * CSS class applied to root if cell selection.
   */
  @HostBinding('class.cell-selection')
  get isCellSelection(): boolean {
    return this.selectionType === SelectionType.cell;
  }

  /**
   * CSS class applied to root if single select.
   */
  @HostBinding('class.single-selection')
  get isSingleSelection(): boolean {
    return this.selectionType === SelectionType.single;
  }

  /**
   * CSS class added to root element if mulit select
   */
  @HostBinding('class.multi-selection')
  get isMultiSelection(): boolean {
    return this.selectionType === SelectionType.multi;
  }

  /**
   * CSS class added to root element if mulit click select
   */
  @HostBinding('class.multi-click-selection')
  get isMultiClickSelection(): boolean {
    return this.selectionType === SelectionType.multiClick;
  }

  /**
   * Column templates gathered from `ContentChildren`
   * if described in your markup.
   */
  @ContentChildren(DataTableColumnDirective)
  set columnTemplates(val: QueryList<DataTableColumnDirective>) {
    this._columnTemplates = val;

    if (val) {
      // only set this if results were brought back
      const arr = val.toArray();

      if (arr.length) {
        // translate them to normal objects
        this._internalColumns = translateTemplates(arr);
        setColumnDefaults(this._internalColumns);
        this.recalculateColumns();
      }
    }
  }

  /**
   * Returns the column templates.
   */
  get columnTemplates(): QueryList<DataTableColumnDirective> {
    return this._columnTemplates;
  }

  /**
   * Row Detail templates gathered from the ContentChild
   */
  @ContentChild(DatatableRowDetailDirective)
  rowDetail: DatatableRowDetailDirective;

  /**
   * Group Header templates gathered from the ContentChild
   */
  @ContentChild(DatatableGroupHeaderDirective)
  groupHeader: DatatableGroupHeaderDirective;  

  /**
   * Footer template gathered from the ContentChild
   */
  @ContentChild(DatatableFooterDirective)
  footer: DatatableFooterDirective;

  /**
   * Reference to the body component for manually
   * invoking functions on the body.
   */
  @ViewChild(DataTableBodyComponent)
  bodyComponent: DataTableBodyComponent;

  /**
   * Returns if all rows are selected.
   */
  get allRowsSelected(): boolean {
    return this.selected &&
      this.rows &&
      this.rows.length !== 0 &&
      this.selected.length === this.rows.length;
  }

  element: HTMLElement;
  innerWidth: number;
  pageSize: number;
  bodyHeight: number;
  rowCount: number = 0;
  offsetX: number = 0;
  rowDiffer: KeyValueDiffer<{}, {}>;

  _limit: number | undefined;
  _count: number = 0;
  _offset: number = 0;
  _rows: any[];
  _groupRowsBy: string;
  _internalRows: any[];
  _internalColumns: TableColumn[];
  _columns: TableColumn[];
  _columnTemplates: QueryList<DataTableColumnDirective>;

  constructor(
    private scrollbarHelper: ScrollbarHelper,
    private cd: ChangeDetectorRef,
    element: ElementRef,
    differs: KeyValueDiffers) {

    // get ref to elm for measuring
    this.element = element.nativeElement;
    this.rowDiffer = differs.find({}).create();
  }

  /**
   * Lifecycle hook that is called after data-bound
   * properties of a directive are initialized.
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
   */
  ngAfterViewInit(): void {
    if (!this.externalSorting) {
      this._internalRows = sortRows(this._rows, this._internalColumns, this.sorts);
    }

    // this has to be done to prevent the change detection
    // tree from freaking out because we are readjusting
    requestAnimationFrame(() => {
      this.recalculate();

      // emit page for virtual server-side kickoff
      if (this.externalPaging && this.scrollbarV) {
        this.page.emit({
          count: this.count,
          pageSize: this.pageSize,
          limit: this.limit,
          offset: 0
        });
      }
    });
  }

  /**
   * Creates a map with the data grouped by the user choice of grouping index
   * 
   * @param originalArray the original array passed via parameter
   * @param groupByIndex  the index of the column to group the data by
   */
  groupArrayBy(originalArray: any, groupBy: any) {
    // create a map to hold groups with their corresponding results
    const map = new Map();
    let i: number = 0;

    originalArray.forEach((item: any) => {
      const key = item[groupBy];
      if (!map.has(key)) {
        map.set(key, [item]);
      } else {
        map.get(key).push(item);
      }
      i++;
    });

    const addGroup = (key: any, value: any) => {
      return {key, value};
    };

    // convert map back to a simple array of objects
    return Array.from(map, x => addGroup(x[0], x[1]));
   }

   /*
   * Lifecycle hook that is called when Angular dirty checks a directive.
   */
  ngDoCheck(): void {
    if (this.rowDiffer.diff(this.rows)) {
      if (!this.externalSorting) {
        this._internalRows = sortRows(this._rows, this._internalColumns, this.sorts);
      } else {
        this._internalRows = [...this.rows];
      }
      
      this.recalculatePages();
      this.cd.markForCheck();
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
   */
  recalculate(): void {
    this.recalculateDims();
    this.recalculateColumns();
  }

  /**
   * Window resize handler to update sizes.
   */
  @HostListener('window:resize')
  @throttleable(5)
  onWindowResize(): void {
    this.recalculate();
  }

  /**
   * Recalulcates the column widths based on column width
   * distribution mode and scrollbar offsets.
   */
  recalculateColumns(
    columns: any[] = this._internalColumns,
    forceIdx: number = -1,
    allowBleed: boolean = this.scrollbarH): any[] {

    if (!columns) return;

    let width = this.innerWidth;
    if (this.scrollbarV) {
      width = width - this.scrollbarHelper.width;
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
   */
  recalculateDims(): void {
    const dims = this.element.getBoundingClientRect();
    this.innerWidth = Math.floor(dims.width);

    if (this.scrollbarV) {
      let height = dims.height;
      if (this.headerHeight) height = height - this.headerHeight;
      if (this.footerHeight) height = height - this.footerHeight;
      this.bodyHeight = height;
    }

    this.recalculatePages();
  }

  /**
   * Recalculates the pages after a update.
   */
  recalculatePages(): void {
    this.pageSize = this.calcPageSize();
    this.rowCount = this.calcRowCount();
  }

  /**
   * Body triggered a page event.
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
   */
  onBodyScroll(event: MouseEvent): void {
    this.offsetX = event.offsetX;
    this.scroll.emit(event);
  }

  /**
   * The footer triggered a page event.
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
    if (this.limit !== undefined) {      
      return this.limit;
    }

    // otherwise use row length
    if (val) {     
      return val.length;
    }

    // other empty :(
    return 0;
  }

  /**
   * Calculates the row count.
   */
  calcRowCount(val: any[] = this.rows): number {
    if (!this.externalPaging) {
      if (!val) return 0;

      if (this.groupedRows) {
        return this.groupedRows.length;
      } else {
        return val.length;
      }        
    }

    return this.count;
  }

  /**
   * The header triggered a contextmenu event.
   */
  onColumnContextmenu({ event, column }: any): void {
    this.tableContextmenu.emit({ event, type: ContextmenuType.header, content: column });
  }

  /**
   * The body triggered a contextmenu event.
   */
  onRowContextmenu({ event, row }: any): void {
    this.tableContextmenu.emit({ event, type: ContextmenuType.body, content: row });
  }

  /**
   * The header triggered a column resize event.
   */
  onColumnResize({ column, newValue }: any): void {
    /* Safari/iOS 10.2 workaround */
    if (column === undefined) {
      return;
    }

    let idx: number;
    const cols = this._internalColumns.map((c, i) => {
      c = { ...c };

      if (c.$$id === column.$$id) {
        idx = i;
        c.width = newValue;

        // set this so we can force the column
        // width distribution to be to this value
        c.$$oldWidth = newValue;
      }

      return c;
    });

    this.recalculateColumns(cols, idx);
    this._internalColumns = cols;

    this.resize.emit({
      column,
      newValue
    });
  }

  /**
   * The header triggered a column re-order event.
   */
  onColumnReorder({ column, newValue, prevValue }: any): void {
    const cols = this._internalColumns.map(c => {
      return { ...c };
    });

    const prevCol = cols[newValue];
    cols[newValue] = column;
    cols[prevValue] = prevCol;

    this._internalColumns = cols;

    this.reorder.emit({
      column,
      newValue,
      prevValue
    });
  }

  /**
   * The header triggered a column sort event.
   */
  onColumnSort(event: any): void {
    const { sorts } = event;

    // this could be optimized better since it will resort
    // the rows again on the 'push' detection...
    if (this.externalSorting === false) {
      // don't use normal setter so we don't resort
      this._internalRows = sortRows(this.rows, this._internalColumns, sorts);
    }

    this.sorts = sorts;
    // Always go to first page when sorting to see the newly sorted data
    this.offset = 0;
    this.bodyComponent.updateOffsetY(this.offset);
    this.sort.emit(event);
  }

  /**
   * Toggle all row selection
   */
  onHeaderSelect(event: any): void {
    // before we splice, chk if we currently have all selected
    const allSelected = this.selected.length === this.rows.length;

    // remove all existing either way
    this.selected = [];

    // do the opposite here
    if (!allSelected) {
      this.selected.push(...this.rows);
    }

    this.select.emit({
      selected: this.selected
    });
  }

  /**
   * A row was selected from body
   */
  onBodySelect(event: any): void {
    this.select.emit(event);
  }
}
