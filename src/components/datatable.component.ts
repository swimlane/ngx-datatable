import {
  Component, Input, Output, ElementRef, EventEmitter, ViewChild,
  HostListener, ContentChildren, OnInit, QueryList, AfterViewInit,
  HostBinding, Renderer, ContentChild, TemplateRef, IterableDiffer,
  ChangeDetectorRef, KeyValueDiffers, SimpleChanges, DoCheck, OnChanges
} from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { forceFillColumnWidths, adjustColumnWidths, sortRows } from '../utils';
import { ColumnMode, SortType, SelectionType } from '../types';
import { DataTableBodyComponent } from './body';
import { DataTableColumnDirective } from './columns';
import { DatatableRowDetailDirective } from './row-detail';
import { scrollbarWidth, setColumnDefaults, translateTemplates } from '../utils';

@Component({
  selector: 'swui-datatable',
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
        [sortAscendingIcon]="cssClasses.sortAscending"
        [sortDescendingIcon]="cssClasses.sortDescending"
        (sort)="onColumnSort($event)"
        (resize)="onColumnResize($event)"
        (reorder)="onColumnReorder($event)">
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
        [rowDetailTemplate]="rowDetailTemplate"
        [detailRowHeight]="detailRowHeight"
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
        (select)="select.emit($event)"
        (detailToggle)="detailToggle.emit($event)"
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
  `
})
export class DatatableComponent implements OnInit, DoCheck, OnChanges, AfterViewInit {

  // Rows
  @Input() set rows(val: any) {
    /*
    // if a observable was passed, lets convert to array
    if(val instanceof Observable) {
      val.concatMap((v) => v)
         .toArray()
         .subscribe((r) => {
           this.rows = r;
           this.cdr.markForCheck();
         });
    } else {
       // auto sort on new updates
      if (!this.externalSorting) {
        val = sortRows(val, this.columns, this.sorts);
      }

      this._rows = val;

      // recalculate sizes/etc
      this.recalculate();
    }
    */

    this.setupObservable(val);
    // this._rows = val;
    // this.recalculate();
  }

  get rows(): any {
    return this._rows;
  }

  // Columns
  @Input() set columns(val: any[]) {
    if(val) {
      setColumnDefaults(val);
      this.recalculateColumns(val);
    }

    this._columns = val;
  }

  get columns(): any[] {
    return this._columns;
  }

  // Selected rows
  @Input() selected: any[] = [];

  // Enable vertical scrollbars
  @Input() scrollbarV: boolean = false;

  // Enable horz scrollbars
  @Input() scrollbarH: boolean = false;

  // The row height; which is necessary
  // to calculate the height for the lazy rendering.
  @Input() rowHeight: number = 30;

  // The detail row height is required especially when virtual scroll is enabled.
  @Input() detailRowHeight: number = 0;

  // Type of column width distribution.
  // Example: flex, force, standard
  @Input() columnMode: ColumnMode = ColumnMode.standard;

  // The minimum header height in pixels.
  // pass falsey for no header
  // note: number|string does not work right
  @Input() headerHeight: any = 30;

  // The minimum footer height in pixels.
  // pass falsey for no footer
  @Input() footerHeight: number = 0;

  // if external paging is turned on
  @Input() externalPaging: boolean = false;

  // if external sorting is turned on
  @Input() externalSorting: boolean = false;

  // Page size
  @Input() limit: number = undefined;

  // Total count
  @Input() count: number = 0;

  // Page offset
  @Input() offset: number = 0;

  // Loading indicator
  @Input() loadingIndicator: boolean = false;

  // Selections?
  @Input() selectionType: SelectionType;

  // if you can reorder columns
  @Input() reorderable: boolean = true;

  // type of sorting
  @Input() sortType: SortType = SortType.single;

  // sorts
  @Input() sorts: any[] = [];

  // row detail template
  @Input() rowDetailTemplate: TemplateRef<any>;

  // css class overrides
  @Input() cssClasses: any = {
    sortAscending: 'icon-down',
    sortDescending: 'icon-up',
    pagerLeftArrow: 'icon-left',
    pagerRightArrow: 'icon-right',
    pagerPrevious: 'icon-prev',
    pagerNext: 'icon-skip'
  };

  // message overrides for localization
  @Input() messages: any = {

    // Message to show when array is presented
    // but contains no values
    emptyMessage: 'No data to display',

    // Footer total message
    totalMessage: 'total'

  };

  // This will be used when displaying or selecting rows:
  // when tracking/comparing them, we'll use the value of this fn,
  // (`fn(x) === fn(y)` instead of `x === y`)
  @Input() rowIdentity: (x: any) => any = ((x: any) => x);

  // A boolean/function you can use to check whether you want
  // to select a particular row based on a criteria. Example:
  // (selection) => { return selection !== 'Ethel Price'; }
  @Input() selectCheck: any;

  // Property to which you can use for custom tracking of rows
  // Example: 'name'
  @Input() trackByProp: string;

  @Output() scroll: EventEmitter<any> = new EventEmitter();
  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() sort: EventEmitter<any> = new EventEmitter();
  @Output() page: EventEmitter<any> = new EventEmitter();
  @Output() detailToggle: EventEmitter<any> = new EventEmitter();
  @Output() reorder: EventEmitter<any> = new EventEmitter();
  @Output() resize: EventEmitter<any> = new EventEmitter();
  @Output() rowContextmenu = new EventEmitter<{event: MouseEvent, row: any}>(false);

  @HostBinding('class.fixed-header')
  get isFixedHeader() {
    const headerHeight: number|string = this.headerHeight;
    return (typeof headerHeight === 'string') ?
      (<string>headerHeight) !== 'auto' : true;
  }

  @HostBinding('class.fixed-row')
  get isFixedRow() {
    const rowHeight: number|string = this.rowHeight;
    return (typeof rowHeight === 'string') ?
      (<string>rowHeight) !== 'auto' : true;
  }

  @HostBinding('class.scroll-vertical')
  get isVertScroll() {
    return this.scrollbarV;
  }

  @HostBinding('class.scroll-horz')
  get isHorScroll() {
    return this.scrollbarH;
  }

  @HostBinding('class.selectable')
  get isSelectable() {
    return this.selectionType !== undefined;
  }

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

  get columnTemplates(): QueryList<DataTableColumnDirective> {
    return this._columnTemplates;
  }

  @ContentChild(DatatableRowDetailDirective)
  set rowDetailTemplateChild(val: DatatableRowDetailDirective) {
    this._rowDetailTemplateChild = val;
    if(val) this.rowDetailTemplate = val.rowDetailTemplate;
  }

  get rowDetailTemplateChild(): DatatableRowDetailDirective {
    return this._rowDetailTemplateChild;
  }

  offsetX: number = 0;

  @ViewChild(DataTableBodyComponent)
  private bodyComponent: DataTableBodyComponent;

  private element: HTMLElement;
  private innerWidth: number;
  private pageSize: number;
  private bodyHeight: number;
  private rowCount: number;
  private rowDiffer: IterableDiffer;
  private colDiffer: IterableDiffer;

  private _rows: any[];
  private _columns: any[];
  private _columnTemplates: QueryList<DataTableColumnDirective>;
  private _rowDetailTemplateChild: DatatableRowDetailDirective;

  constructor(
    renderer: Renderer, 
    element: ElementRef,
    differs: KeyValueDiffers,
    private cdr: ChangeDetectorRef) {

    // get ref to elm for measuring
    this.element = element.nativeElement;

    // manually set table class for speed
    renderer.setElementClass(this.element, 'datatable', true);

    // setup some differs
    this.rowDiffer = differs.find({}).create(null);
    this.colDiffer = differs.find({}).create(null);
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
    this.recalculate();
  }

  setupObservable(val: any[]) {
    if(!val) return;

    let rowObservable = Observable.merge(
      Observable.of(val),
      Observable.from(val)
        .flatMap(function(item) {
          return Observable.of(item);
        })
    );

    rowObservable.subscribe((x) => {
      console.log('next', x);
    }, (y) => {
      console.log('err', y);
    }, () => {
      console.log('done', rowObservable);

      // this._rows = rowObservable['source']['array'];

      rowObservable.toArray().subscribe((r) => {
        if(!r.length) return;

        this._rows = r[0];
        this.recalculate();
        console.log('DONE RESULTS!', this._rows, r);
        // console.trace();
        // this.cdr.markForCheck();
      });
    });
  }

  /**
   * Lifecycle hook that is called when 
   * Angular dirty checks a directive.
   * 
   * @memberOf DatatableComponent
   */
  ngDoCheck(): void {
    // console.log('checking...');

    const rowDiff = this.rowDiffer.diff(this.rows);
    if (rowDiff) {
      // console.log('diff', rowDiff);
    }
  }

  /**
   * Lifecycle hook that is called when any 
   * data-bound property of a directive changes.
   * 
   * @param {SimpleChanges} changes
   * 
   * @memberOf DatatableComponent
   */
  ngOnChanges(changes: SimpleChanges): void {
    // console.log('changes', changes);

    if (changes.hasOwnProperty('rows')) {
      // console.log('row update', changes);
    }
  }

  /**
   * Toggle the expansion of the row
   *
   * @param rowIndex
   */
  toggleExpandRow(row: any): void {
    // Should we write a guard here??
    this.bodyComponent.toggleRowExpansion(row);
  }

  /**
   * API method to expand all the rows.
   * 
   * @memberOf DatatableComponent
   */
  expandAllRows(): void {
    this.bodyComponent.toggleAllRows(true);
  }

  /**
   * API method to collapse all the rows.
   * 
   * @memberOf DatatableComponent
   */
  collapseAllRows(): void {
    this.bodyComponent.toggleAllRows(false);
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
  @HostListener('window:resize')
  recalculate(): void {
    this.recalculateDims();
    this.recalculateColumns();
  }

  /**
   * Recalulcates the column widths based on column width
   * distribution mode and scrollbar offsets.
   * 
   * @param {any[]} [columns=this.columns]
   * @param {number} [forceIdx]
   * @returns {any[]}
   * 
   * @memberOf DatatableComponent
   */
  recalculateColumns(columns: any[] = this.columns, forceIdx?: number): any[] {
    if (!columns) return;

    let width = this.innerWidth;
    if (this.scrollbarV) {
      width = width - scrollbarWidth;
    }

    if (this.columnMode === ColumnMode.force) {
      forceFillColumnWidths(columns, width, forceIdx);
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
    if (this.scrollbarV) return Math.ceil(this.bodyHeight / this.rowHeight);

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
      this.rows = sortRows(this.rows, this.columns, sorts);
    }

    this.sorts = sorts;
    this.bodyComponent.updateOffsetY(0);
    this.sort.emit(event);
  }

}
