import { ElementRef, EventEmitter, OnInit, QueryList, AfterViewInit, TemplateRef } from '@angular/core';
import { ColumnMode, SortType, SelectionType } from '../types';
import { DataTableColumnDirective } from './columns';
import { DataTableRowDetailDirective } from './row-detail';
export declare class DataTableComponent implements OnInit, AfterViewInit {
    /**
     * Gets the rows.
     *
     * @readonly
     * @type {*}
     * @memberOf DataTableComponent
     */
    /**
     * Rows that are displayed in the table.
     *
     * @memberOf DataTableComponent
     */
    rows: any;
    /**
     * Get the columns.
     *
     * @readonly
     * @type {any[]}
     * @memberOf DataTableComponent
     */
    /**
     * Columns to be displayed.
     *
     * @memberOf DataTableComponent
     */
    columns: any[];
    /**
     * List of row objects that should be
     * represented as selected in the grid.
     * Default value: `[]`
     *
     * @type {any[]}
     * @memberOf DataTableComponent
     */
    selected: any[];
    /**
     * Enable vertical scrollbars
     *
     * @type {boolean}
     * @memberOf DataTableComponent
     */
    scrollbarV: boolean;
    /**
     * Enable horz scrollbars
     *
     * @type {boolean}
     * @memberOf DataTableComponent
     */
    scrollbarH: boolean;
    /**
     * The row height; which is necessary
     * to calculate the height for the lazy rendering.
     *
     * @type {number}
     * @memberOf DataTableComponent
     */
    rowHeight: number;
    /**
     * The detail row height is required especially
     * when virtual scroll is enabled.
     *
     * @type {number}
     * @memberOf DataTableComponent
     */
    detailRowHeight: number;
    /**
     * Type of column width distribution formula.
     * Example: flex, force, standard
     *
     * @type {ColumnMode}
     * @memberOf DataTableComponent
     */
    columnMode: ColumnMode;
    /**
     * The minimum header height in pixels.
     * Pass a falsey for no header
     *
     * @type {*}
     * @memberOf DataTableComponent
     */
    headerHeight: any;
    /**
     * The minimum footer height in pixels.
     * Pass falsey for no footer
     *
     * @type {number}
     * @memberOf DataTableComponent
     */
    footerHeight: number;
    /**
     * If the table should use external paging
     * otherwise its assumed that all data is preloaded.
     *
     * @type {boolean}
     * @memberOf DataTableComponent
     */
    externalPaging: boolean;
    /**
     * If the table should use external sorting or
     * the built-in basic sorting.
     *
     * @type {boolean}
     * @memberOf DataTableComponent
     */
    externalSorting: boolean;
    /**
     * The page size to be shown.
     * Default value: `undefined`
     *
     * @type {number}
     * @memberOf DataTableComponent
     */
    limit: number;
    /**
     * The total count of all rows.
     * Default value: `0`
     *
     * @type {number}
     * @memberOf DataTableComponent
     */
    count: number;
    /**
     * The current offset ( page - 1 ) shown.
     * Default value: `0`
     *
     * @type {number}
     * @memberOf DataTableComponent
     */
    offset: number;
    /**
     * Show the linear loading bar.
     * Default value: `false`
     *
     * @type {boolean}
     * @memberOf DataTableComponent
     */
    loadingIndicator: boolean;
    /**
     * Type of row selection. Options are:
     *
     *  - `single`
     *  - `multi`
     *  - `multiShift`.
     *
     * For no selection pass a `falsey`.
     * Default value: `undefined`
     *
     * @type {SelectionType}
     * @memberOf DataTableComponent
     */
    selectionType: SelectionType;
    /**
     * Enable/Disable ability to re-order columns
     * by dragging them.
     *
     * @type {boolean}
     * @memberOf DataTableComponent
     */
    reorderable: boolean;
    /**
     * The type of sorting
     *
     * @type {SortType}
     * @memberOf DataTableComponent
     */
    sortType: SortType;
    /**
     * Array of sorted columns by property and type.
     * Default value: `[]`
     *
     * @type {any[]}
     * @memberOf DataTableComponent
     */
    sorts: any[];
    /**
     * Row detail template
     *
     * @type {TemplateRef<any>}
     * @memberOf DataTableComponent
     */
    rowDetailTemplate: TemplateRef<any>;
    /**
     * Css class overrides
     *
     * @type {*}
     * @memberOf DataTableComponent
     */
    cssClasses: any;
    /**
     * Message overrides for localization
     *
     * @type {*}
     * @memberOf DataTableComponent
     */
    messages: any;
    /**
     * This will be used when displaying or selecting rows.
     * when tracking/comparing them, we'll use the value of this fn,
     *
     * (`fn(x) === fn(y)` instead of `x === y`)
     *
     * @memberOf DataTableComponent
     */
    rowIdentity: (x: any) => any;
    /**
     * A boolean/function you can use to check whether you want
     * to select a particular row based on a criteria. Example:
     *
     *    (selection) => {
     *      return selection !== 'Ethel Price';
     *    }
     *
     * @type {*}
     * @memberOf DataTableComponent
     */
    selectCheck: any;
    /**
     * Property to which you can use for custom tracking of rows.
     * Example: 'name'
     *
     * @type {string}
     * @memberOf DataTableComponent
     */
    trackByProp: string;
    /**
     * Body was scrolled typically in a `scrollbarV:true` scenario.
     *
     * @type {EventEmitter<any>}
     * @memberOf DataTableComponent
     */
    scroll: EventEmitter<any>;
    /**
     * A cell or row was focused via keyboard or mouse click.
     *
     * @type {EventEmitter<any>}
     * @memberOf DataTableComponent
     */
    activate: EventEmitter<any>;
    /**
     * A cell or row was selected.
     *
     * @type {EventEmitter<any>}
     * @memberOf DataTableComponent
     */
    select: EventEmitter<any>;
    /**
     * Column sort was invoked.
     *
     * @type {EventEmitter<any>}
     * @memberOf DataTableComponent
     */
    sort: EventEmitter<any>;
    /**
     * The table was paged either triggered by the pager or the body scroll.
     *
     * @type {EventEmitter<any>}
     * @memberOf DataTableComponent
     */
    page: EventEmitter<any>;
    /**
     * Row detail row visbility was toggled.
     *
     * @type {EventEmitter<any>}
     * @memberOf DataTableComponent
     */
    detailToggle: EventEmitter<any>;
    /**
     * Columns were re-ordered.
     *
     * @type {EventEmitter<any>}
     * @memberOf DataTableComponent
     */
    reorder: EventEmitter<any>;
    /**
     * Column was resized.
     *
     * @type {EventEmitter<any>}
     * @memberOf DataTableComponent
     */
    resize: EventEmitter<any>;
    /**
     * The context menu was invoked on a row.
     *
     * @memberOf DataTableComponent
     */
    rowContextmenu: EventEmitter<{
        event: MouseEvent;
        row: any;
    }>;
    /**
     * CSS class applied if the header height if fixed height.
     *
     * @readonly
     * @type {boolean}
     * @memberOf DataTableComponent
     */
    readonly isFixedHeader: boolean;
    /**
     * CSS class applied to the root element if
     * the row heights are fixed heights.
     *
     * @readonly
     * @type {boolean}
     * @memberOf DataTableComponent
     */
    readonly isFixedRow: boolean;
    /**
     * CSS class applied to root element if
     * vertical scrolling is enabled.
     *
     * @readonly
     * @type {boolean}
     * @memberOf DataTableComponent
     */
    readonly isVertScroll: boolean;
    /**
     * CSS class applied to the root element
     * if the horziontal scrolling is enabled.
     *
     * @readonly
     *
     * @memberOf DataTableComponent
     */
    readonly isHorScroll: boolean;
    /**
     * CSS class applied to root element is selectable.
     *
     * @readonly
     * @type {boolean}
     * @memberOf DataTableComponent
     */
    readonly isSelectable: boolean;
    /**
     * CSS class applied to root is checkbox selection.
     *
     * @readonly
     * @type {boolean}
     * @memberOf DataTableComponent
     */
    readonly isCheckboxSelection: boolean;
    /**
     * CSS class applied to root if cell selection.
     *
     * @readonly
     * @type {boolean}
     * @memberOf DataTableComponent
     */
    readonly isCellSelection: boolean;
    /**
     * CSS class applied to root if single select.
     *
     * @readonly
     * @type {boolean}
     * @memberOf DataTableComponent
     */
    readonly isSingleSelection: boolean;
    /**
     * CSS class added to root element if mulit select
     *
     * @readonly
     * @type {boolean}
     * @memberOf DataTableComponent
     */
    readonly isMultiSelection: boolean;
    /**
     * Returns the column templates.
     *
     * @readonly
     * @type {QueryList<DataTableColumnDirective>}
     * @memberOf DataTableComponent
     */
    /**
     * Column templates gathered from `ContentChildren`
     * if described in your markup.
     *
     * @memberOf DataTableComponent
     */
    columnTemplates: QueryList<DataTableColumnDirective>;
    /**
     * Returns the row templates.
     *
     * @readonly
     * @type {DataTableRowDetailDirective}
     * @memberOf DataTableComponent
     */
    /**
     * Row Detail templates gathered from the ContentChild
     *
     * @memberOf DataTableComponent
     */
    rowDetailTemplateChild: DataTableRowDetailDirective;
    /**
     * Reference to the body component for manually
     * invoking functions on the body.
     *
     * @private
     * @type {DataTableBodyComponent}
     * @memberOf DataTableComponent
     */
    private bodyComponent;
    /**
     * Returns if all rows are selected.
     *
     * @readonly
     * @private
     * @type {boolean}
     * @memberOf DataTableComponent
     */
    private readonly allRowsSelected;
    private element;
    private innerWidth;
    private pageSize;
    private bodyHeight;
    private rowCount;
    private offsetX;
    private _rows;
    private _columns;
    private _columnTemplates;
    private _rowDetailTemplateChild;
    constructor(element: ElementRef);
    /**
     * Lifecycle hook that is called after data-bound
     * properties of a directive are initialized.
     *
     * @memberOf DataTableComponent
     */
    ngOnInit(): void;
    /**
     * Lifecycle hook that is called after a component's
     * view has been fully initialized.
     *
     * @memberOf DataTableComponent
     */
    ngAfterViewInit(): void;
    /**
     * Toggle the expansion of the row
     *
     * @param rowIndex
     */
    toggleExpandRow(row: any): void;
    /**
     * API method to expand all the rows.
     *
     * @memberOf DataTableComponent
     */
    expandAllRows(): void;
    /**
     * API method to collapse all the rows.
     *
     * @memberOf DataTableComponent
     */
    collapseAllRows(): void;
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
     * @memberOf DataTableComponent
     */
    recalculate(): void;
    /**
     * Recalulcates the column widths based on column width
     * distribution mode and scrollbar offsets.
     *
     * @param {any[]} [columns=this.columns]
     * @param {number} [forceIdx=false]
     * @param {boolean} [allowBleed=this.scrollH]
     * @returns {any[]}
     *
     * @memberOf DataTableComponent
     */
    recalculateColumns(columns?: any[], forceIdx?: number, allowBleed?: boolean): any[];
    /**
     * Recalculates the dimensions of the table size.
     * Internally calls the page size and row count calcs too.
     *
     * @memberOf DataTableComponent
     */
    recalculateDims(): void;
    /**
     * Body triggered a page event.
     *
     * @param {*} { offset }
     *
     * @memberOf DataTableComponent
     */
    onBodyPage({offset}: any): void;
    /**
     * The body triggered a scroll event.
     *
     * @param {MouseEvent} event
     *
     * @memberOf DataTableComponent
     */
    onBodyScroll(event: MouseEvent): void;
    /**
     * The footer triggered a page event.
     *
     * @param {*} event
     *
     * @memberOf DataTableComponent
     */
    onFooterPage(event: any): void;
    /**
     * Recalculates the sizes of the page
     *
     * @param {any[]} [val=this.rows]
     * @returns {number}
     *
     * @memberOf DataTableComponent
     */
    calcPageSize(val?: any[]): number;
    /**
     * Calculates the row count.
     *
     * @param {any[]} [val=this.rows]
     * @returns {number}
     *
     * @memberOf DataTableComponent
     */
    calcRowCount(val?: any[]): number;
    /**
     * The header triggered a column resize event.
     *
     * @param {*} { column, newValue }
     *
     * @memberOf DataTableComponent
     */
    onColumnResize({column, newValue}: any): void;
    /**
     * The header triggered a column re-order event.
     *
     * @param {*} { column, newValue, prevValue }
     *
     * @memberOf DataTableComponent
     */
    onColumnReorder({column, newValue, prevValue}: any): void;
    /**
     * The header triggered a column sort event.
     *
     * @param {*} event
     *
     * @memberOf DataTableComponent
     */
    onColumnSort(event: any): void;
    /**
     * Toggle all row selection
     *
     * @param {*} event
     *
     * @memberOf DataTableComponent
     */
    onHeaderSelect(event: any): void;
    /**
     * A row was selected from body
     *
     * @param {*} event
     *
     * @memberOf DataTableComponent
     */
    onBodySelect(event: any): void;
}
