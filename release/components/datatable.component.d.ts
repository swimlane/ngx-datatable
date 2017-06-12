import { ElementRef, EventEmitter, OnInit, QueryList, AfterViewInit, DoCheck, KeyValueDiffers, KeyValueDiffer } from '@angular/core';
import { ScrollbarHelper } from '../services';
import { ColumnMode, SortType, SelectionType, TableColumn, ContextmenuType } from '../types';
import { DataTableBodyComponent } from './body';
import { DataTableColumnDirective } from './columns';
import { DatatableRowDetailDirective } from './row-detail';
import { DatatableFooterDirective } from './footer';
export declare class DatatableComponent implements OnInit, AfterViewInit, DoCheck {
    private scrollbarHelper;
    /**
     * Gets the rows.
     *
     * @readonly
     * @type {*}
     * @memberOf DatatableComponent
     */
    /**
     * Rows that are displayed in the table.
     *
     * @memberOf DatatableComponent
     */
    rows: any;
    /**
     * Get the columns.
     *
     * @readonly
     * @type {any[]}
     * @memberOf DatatableComponent
     */
    /**
     * Columns to be displayed.
     *
     * @memberOf DatatableComponent
     */
    columns: TableColumn[];
    /**
     * List of row objects that should be
     * represented as selected in the grid.
     * Default value: `[]`
     *
     * @type {any[]}
     * @memberOf DatatableComponent
     */
    selected: any[];
    /**
     * Enable vertical scrollbars
     *
     * @type {boolean}
     * @memberOf DatatableComponent
     */
    scrollbarV: boolean;
    /**
     * Enable horz scrollbars
     *
     * @type {boolean}
     * @memberOf DatatableComponent
     */
    scrollbarH: boolean;
    /**
     * The row height; which is necessary
     * to calculate the height for the lazy rendering.
     *
     * @type {number}
     * @memberOf DatatableComponent
     */
    rowHeight: number;
    /**
     * Type of column width distribution formula.
     * Example: flex, force, standard
     *
     * @type {ColumnMode}
     * @memberOf DatatableComponent
     */
    columnMode: ColumnMode;
    /**
     * The minimum header height in pixels.
     * Pass a falsey for no header
     *
     * @type {*}
     * @memberOf DatatableComponent
     */
    headerHeight: any;
    /**
     * The minimum footer height in pixels.
     * Pass falsey for no footer
     *
     * @type {number}
     * @memberOf DatatableComponent
     */
    footerHeight: number;
    /**
     * If the table should use external paging
     * otherwise its assumed that all data is preloaded.
     *
     * @type {boolean}
     * @memberOf DatatableComponent
     */
    externalPaging: boolean;
    /**
     * If the table should use external sorting or
     * the built-in basic sorting.
     *
     * @type {boolean}
     * @memberOf DatatableComponent
     */
    externalSorting: boolean;
    /**
     * The page size to be shown.
     * Default value: `undefined`
     *
     * @type {number}
     * @memberOf DatatableComponent
     */
    limit: number;
    /**
     * Gets the count.
     *
     * @readonly
     * @type {number}
     * @memberOf DatatableComponent
     */
    /**
     * The total count of all rows.
     * Default value: `0`
     *
     * @type {number}
     * @memberOf DatatableComponent
     */
    count: number;
    /**
     * The current offset ( page - 1 ) shown.
     * Default value: `0`
     *
     * @type {number}
     * @memberOf DatatableComponent
     */
    offset: number;
    /**
     * Show the linear loading bar.
     * Default value: `false`
     *
     * @type {boolean}
     * @memberOf DatatableComponent
     */
    loadingIndicator: boolean;
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
     *
     * @type {SelectionType}
     * @memberOf DatatableComponent
     */
    selectionType: SelectionType;
    /**
     * Enable/Disable ability to re-order columns
     * by dragging them.
     *
     * @type {boolean}
     * @memberOf DatatableComponent
     */
    reorderable: boolean;
    /**
     * The type of sorting
     *
     * @type {SortType}
     * @memberOf DatatableComponent
     */
    sortType: SortType;
    /**
     * Array of sorted columns by property and type.
     * Default value: `[]`
     *
     * @type {any[]}
     * @memberOf DatatableComponent
     */
    sorts: any[];
    /**
     * Css class overrides
     *
     * @type {*}
     * @memberOf DatatableComponent
     */
    cssClasses: any;
    /**
     * Message overrides for localization
     *
     * emptyMessage     [default] = 'No data to display'
     * totalMessage     [default] = 'total'
     * selectedMessage  [default] = 'selected'
     *
     * @type {*}
     * @memberOf DatatableComponent
     */
    messages: any;
    /**
     * This will be used when displaying or selecting rows.
     * when tracking/comparing them, we'll use the value of this fn,
     *
     * (`fn(x) === fn(y)` instead of `x === y`)
     *
     * @memberOf DatatableComponent
     */
    rowIdentity: (x: any) => any;
    /**
     * Row specific classes.
     * Similar implementation to ngClass.
     *
     *  [rowClass]="'first second'"
     *  [rowClass]="{ 'first': true, 'second': true, 'third': false }"
     *
     * @type {*}
     * @memberOf DatatableComponent
     */
    rowClass: any;
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
    selectCheck: any;
    /**
     * Property to which you can use for custom tracking of rows.
     * Example: 'name'
     *
     * @type {string}
     * @memberOf DatatableComponent
     */
    trackByProp: string;
    /**
     * Body was scrolled typically in a `scrollbarV:true` scenario.
     *
     * @type {EventEmitter<any>}
     * @memberOf DatatableComponent
     */
    scroll: EventEmitter<any>;
    /**
     * A cell or row was focused via keyboard or mouse click.
     *
     * @type {EventEmitter<any>}
     * @memberOf DatatableComponent
     */
    activate: EventEmitter<any>;
    /**
     * A cell or row was selected.
     *
     * @type {EventEmitter<any>}
     * @memberOf DatatableComponent
     */
    select: EventEmitter<any>;
    /**
     * Column sort was invoked.
     *
     * @type {EventEmitter<any>}
     * @memberOf DatatableComponent
     */
    sort: EventEmitter<any>;
    /**
     * The table was paged either triggered by the pager or the body scroll.
     *
     * @type {EventEmitter<any>}
     * @memberOf DatatableComponent
     */
    page: EventEmitter<any>;
    /**
     * Columns were re-ordered.
     *
     * @type {EventEmitter<any>}
     * @memberOf DatatableComponent
     */
    reorder: EventEmitter<any>;
    /**
     * Column was resized.
     *
     * @type {EventEmitter<any>}
     * @memberOf DatatableComponent
     */
    resize: EventEmitter<any>;
    /**
     * The context menu was invoked on the table.
     * type indicates whether the header or the body was clicked.
     * content contains either the column or the row that was clicked.
     *
     * @memberOf DatatableComponent
     */
    tableContextmenu: EventEmitter<{
        event: MouseEvent;
        type: ContextmenuType;
        content: any;
    }>;
    /**
     * CSS class applied if the header height if fixed height.
     *
     * @readonly
     * @type {boolean}
     * @memberOf DatatableComponent
     */
    readonly isFixedHeader: boolean;
    /**
     * CSS class applied to the root element if
     * the row heights are fixed heights.
     *
     * @readonly
     * @type {boolean}
     * @memberOf DatatableComponent
     */
    readonly isFixedRow: boolean;
    /**
     * CSS class applied to root element if
     * vertical scrolling is enabled.
     *
     * @readonly
     * @type {boolean}
     * @memberOf DatatableComponent
     */
    readonly isVertScroll: boolean;
    /**
     * CSS class applied to the root element
     * if the horziontal scrolling is enabled.
     *
     * @readonly
     * @type {boolean}
     * @memberOf DatatableComponent
     */
    readonly isHorScroll: boolean;
    /**
     * CSS class applied to root element is selectable.
     *
     * @readonly
     * @type {boolean}
     * @memberOf DatatableComponent
     */
    readonly isSelectable: boolean;
    /**
     * CSS class applied to root is checkbox selection.
     *
     * @readonly
     * @type {boolean}
     * @memberOf DatatableComponent
     */
    readonly isCheckboxSelection: boolean;
    /**
     * CSS class applied to root if cell selection.
     *
     * @readonly
     * @type {boolean}
     * @memberOf DatatableComponent
     */
    readonly isCellSelection: boolean;
    /**
     * CSS class applied to root if single select.
     *
     * @readonly
     * @type {boolean}
     * @memberOf DatatableComponent
     */
    readonly isSingleSelection: boolean;
    /**
     * CSS class added to root element if mulit select
     *
     * @readonly
     * @type {boolean}
     * @memberOf DatatableComponent
     */
    readonly isMultiSelection: boolean;
    /**
     * CSS class added to root element if mulit click select
     *
     * @readonly
     * @type {boolean}
     * @memberOf DatatableComponent
     */
    readonly isMultiClickSelection: boolean;
    /**
     * Returns the column templates.
     *
     * @readonly
     * @type {QueryList<DataTableColumnDirective>}
     * @memberOf DatatableComponent
     */
    /**
     * Column templates gathered from `ContentChildren`
     * if described in your markup.
     *
     * @memberOf DatatableComponent
     */
    columnTemplates: QueryList<DataTableColumnDirective>;
    /**
     * Row Detail templates gathered from the ContentChild
     *
     * @memberOf DatatableComponent
     */
    rowDetail: DatatableRowDetailDirective;
    /**
     * Footer template gathered from the ContentChild
     *
     * @type {DatatableFooterDirective}
     * @memberOf DatatableComponent
     */
    footer: DatatableFooterDirective;
    /**
     * Reference to the body component for manually
     * invoking functions on the body.
     *
     * @private
     * @type {DataTableBodyComponent}
     * @memberOf DatatableComponent
     */
    bodyComponent: DataTableBodyComponent;
    /**
     * Returns if all rows are selected.
     *
     * @readonly
     * @private
     * @type {boolean}
     * @memberOf DatatableComponent
     */
    readonly allRowsSelected: boolean;
    element: HTMLElement;
    innerWidth: number;
    pageSize: number;
    bodyHeight: number;
    rowCount: number;
    offsetX: number;
    rowDiffer: KeyValueDiffer<{}, {}>;
    _count: number;
    _rows: any[];
    _columns: TableColumn[];
    _columnTemplates: QueryList<DataTableColumnDirective>;
    constructor(scrollbarHelper: ScrollbarHelper, element: ElementRef, differs: KeyValueDiffers);
    /**
     * Lifecycle hook that is called after data-bound
     * properties of a directive are initialized.
     *
     * @memberOf DatatableComponent
     */
    ngOnInit(): void;
    /**
     * Lifecycle hook that is called after a component's
     * view has been fully initialized.
     *
     * @memberOf DatatableComponent
     */
    ngAfterViewInit(): void;
    /**
     * Lifecycle hook that is called when Angular dirty checks a directive.
     *
     * @memberOf DatatableComponent
     */
    ngDoCheck(): void;
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
    recalculate(): void;
    /**
     * Window resize handler to update sizes.
     *
     * @memberOf DatatableComponent
     */
    onWindowResize(): void;
    /**
     * Recalulcates the column widths based on column width
     * distribution mode and scrollbar offsets.
     *
     * @param {any[]} [columns=this.columns]
     * @param {number} [forceIdx=-1]
     * @param {boolean} [allowBleed=this.scrollH]
     * @returns {any[]}
     *
     * @memberOf DatatableComponent
     */
    recalculateColumns(columns?: any[], forceIdx?: number, allowBleed?: boolean): any[];
    /**
     * Recalculates the dimensions of the table size.
     * Internally calls the page size and row count calcs too.
     *
     * @memberOf DatatableComponent
     */
    recalculateDims(): void;
    /**
     * Recalculates the pages after a update.
     *
     *
     * @memberOf DatatableComponent
     */
    recalculatePages(): void;
    /**
     * Body triggered a page event.
     *
     * @param {*} { offset }
     *
     * @memberOf DatatableComponent
     */
    onBodyPage({offset}: any): void;
    /**
     * The body triggered a scroll event.
     *
     * @param {MouseEvent} event
     *
     * @memberOf DatatableComponent
     */
    onBodyScroll(event: MouseEvent): void;
    /**
     * The footer triggered a page event.
     *
     * @param {*} event
     *
     * @memberOf DatatableComponent
     */
    onFooterPage(event: any): void;
    /**
     * Recalculates the sizes of the page
     *
     * @param {any[]} [val=this.rows]
     * @returns {number}
     *
     * @memberOf DatatableComponent
     */
    calcPageSize(val?: any[]): number;
    /**
     * Calculates the row count.
     *
     * @param {any[]} [val=this.rows]
     * @returns {number}
     *
     * @memberOf DatatableComponent
     */
    calcRowCount(val?: any[]): number;
    /**
     * The header triggered a contextmenu event.
     *
     * @param {*} { event, column }
     *
     * @memberOf DatatableComponent
     */
    onColumnContextmenu({event, column}: any): void;
    /**
     * The body triggered a contextmenu event.
     *
     * @param {*} { event, row }
     *
     * @memberOf DatatableComponent
     */
    onRowContextmenu({event, row}: any): void;
    /**
     * The header triggered a column resize event.
     *
     * @param {*} { column, newValue }
     *
     * @memberOf DatatableComponent
     */
    onColumnResize({column, newValue}: any): void;
    /**
     * The header triggered a column re-order event.
     *
     * @param {*} { column, newValue, prevValue }
     *
     * @memberOf DatatableComponent
     */
    onColumnReorder({column, newValue, prevValue}: any): void;
    /**
     * The header triggered a column sort event.
     *
     * @param {*} event
     *
     * @memberOf DatatableComponent
     */
    onColumnSort(event: any): void;
    /**
     * Toggle all row selection
     *
     * @param {*} event
     *
     * @memberOf DatatableComponent
     */
    onHeaderSelect(event: any): void;
    /**
     * A row was selected from body
     *
     * @param {*} event
     *
     * @memberOf DatatableComponent
     */
    onBodySelect(event: any): void;
}
