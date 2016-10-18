// Extra variables that live on Global that
// will be replaced by webpack DefinePlugin
declare var ENV: string;
declare var APP_VERSION: string;
declare var IS_PRODUCTION: boolean;
declare var HMR: boolean;

interface ErrorStackTraceLimit {
  stackTraceLimit: number;
}

interface ErrorConstructor extends ErrorStackTraceLimit {}

interface IntersectionObserver {
  root: HTMLElement;
  rootMargin: string;
  thresholds: Array<number>;
  disconnect: Function;
  observe: Function;
  takeRecords: Function;
  unobserve: Function;
}
declare module 'angular2-data-table' {
	/**
	 * Creates a unique object id.
	 * http://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
	 */
	export function id(): string;

}
declare module 'angular2-data-table' {
	/**
	 * Returns the columns by pin.
	 * @param {array} cols
	 */
	export function columnsByPin(cols: any): {
	    left: any[];
	    center: any[];
	    right: any[];
	};
	/**
	 * Returns the widths of all group sets of a column
	 * @param {object} groups
	 * @param {array} all
	 */
	export function columnGroupWidths(groups: any, all: any): {
	    left: number;
	    center: number;
	    right: number;
	    total: number;
	};
	/**
	 * Calculates the total width of all columns and their groups
	 * @param {array} columns
	 * @param {string} prop width to get
	 */
	export function columnTotalWidth(columns: any, prop?: any): number;
	/**
	 * Calculates the total width of all columns and their groups
	 * @param {array} columns
	 * @param {string} property width to get
	 */
	export function columnsTotalWidth(columns: any, prop?: any): number;

}
declare module 'angular2-data-table' {
	/**
	 * Returns a deep object given a string. zoo['animal.type']
	 * @param {object} obj
	 * @param {string} path
	 */
	export function deepValueGetter(obj: any, path: any): any;

}
declare module 'angular2-data-table' {
	/**
	 * Converts strings from something to camel case
	 * http://stackoverflow.com/questions/10425287/convert-dash-separated-string-to-camelcase
	 * @param  {string} str
	 * @return {string} camel case string
	 */
	export function camelCase(str: any): any;

}
declare module 'angular2-data-table' {
	export enum Keys {
	    up = 38,
	    down = 40,
	    return = 13,
	    escape = 27,
	}

}
declare module 'angular2-data-table' {
	/**
	 * Calculates the Total Flex Grow
	 * @param {array}
	 */
	export function getTotalFlexGrow(columns: any): number;
	/**
	 * Adjusts the column widths.
	 * Inspired by: https://github.com/facebook/fixed-data-table/blob/master/src/FixedDataTableWidthHelper.js
	 * @param {array} all columns
	 * @param {int} width
	 */
	export function adjustColumnWidths(allColumns: any, expectedWidth: any): void;
	/**
	 * Forces the width of the columns to
	 * distribute equally but overflowing when nesc.
	 *
	 * Rules:
	 *
	 *  - If combined withs are less than the total width of the grid,
	 *    proporation the widths given the min / max / noraml widths to fill the width.
	 *
	 *  - If the combined widths, exceed the total width of the grid,
	 *    use the standard widths.
	 *
	 *  - If a column is resized, it should always use that width
	 *
	 *  - The proporational widths should never fall below min size if specified.
	 *
	 *  - If the grid starts off small but then becomes greater than the size ( + / - )
	 *    the width should use the orginial width; not the newly proporatied widths.
	 *
	 * @param {array} allColumns
	 * @param {int} expectedWidth
	 */
	export function forceFillColumnWidths(allColumns: any, expectedWidth: any, startIdx: any): void;

}
declare module 'angular2-data-table' {
	export function getVendorPrefixedName(property: any): any;

}
declare module 'angular2-data-table' {
	/**
	 * Gets the width of the scrollbar.  Nesc for windows
	 * http://stackoverflow.com/a/13382873/888165
	 * @return {int} width
	 */
	export function scrollbarWidth(): number;

}
declare module 'angular2-data-table' {
	export function selectRows(selected: any, row: any): any;
	export function selectRowsBetween(selected: any, rows: any, index: any, prevIndex: any): any;

}
declare module 'angular2-data-table' {
	export function translateXY(styles: any, x: any, y: any): void;

}
declare module 'angular2-data-table' {
	/**
	 * Observes changes to an elements visibility.
	 * https://medium.com/@amcdnl/javascript-s-new-intersectionobserver-cdce8a73bef8#.evn5twug3
	 *
	 * Example:
	 *
	 * 		var elm = document.getElementById("panda");
	 * 	 	new VisibilityObserver(elm, function() {
	 * 			alert('PAndas rock!');
	 * 	  });
	 *
	 */
	export class VisibilityObserver {
	    observer: IntersectionObserver;
	    callback: any;
	    constructor(element: any, callback: any);
	    runPolyfill(element: any): void;
	    isVisible(boundingClientRect: any, intersectionRect: any): boolean;
	    visibleTimerCallback(element: any, observer: any): void;
	    processChanges(changes: any): void;
	}

}
declare module 'angular2-data-table' {
	/**
	 * Debounce a function
	 * @param  {any}     func      function to executoe
	 * @param  {number}  wait      wait duration
	 * @param  {boolean} immediate wait or immediate executue
	 */
	export function debounce(func: any, wait: number, immediate?: boolean): () => any;
	/**
	 * Debounce decorator
	 *
	 *  class MyClass {
	 *    debounceable(10)
	 *    myFn() { ... }
	 *  }
	 */
	export function debounceable(duration: number, immediate?: boolean): (target: any, key: any, descriptor: any) => {
	    configurable: boolean;
	    enumerable: any;
	    get: () => any;
	};

}
declare module 'angular2-data-table' {
	import { PipeTransform } from '@angular/core';
	/**
	 * Default Column Options
	 * @type {object}
	 */
	export class TableColumn {
	    static getProps(): string[];
	    $$id: string;
	    $$oldWidth: number;
	    isExpressive: boolean;
	    frozenLeft: boolean;
	    frozenRight: boolean;
	    flexGrow: number;
	    minWidth: number;
	    maxWidth: number;
	    width: number;
	    resizeable: boolean;
	    comparator: any;
	    pipe: PipeTransform;
	    sortable: boolean;
	    draggable: boolean;
	    canAutoResize: boolean;
	    name: string;
	    prop: string;
	    cellTemplate: any;
	    headerTemplate: any;
	    private _width;
	    private _minWidth;
	    constructor(props?: any);
	}

}
declare module 'angular2-data-table' {
	export enum ColumnMode {
	    standard,
	    flex,
	    force,
	}

}
declare module 'angular2-data-table' {
	export enum SortType {
	    single,
	    multi,
	}

}
declare module 'angular2-data-table' {
	export enum SortDirection {
	    asc,
	    desc,
	}

}
declare module 'angular2-data-table' {
	export enum SelectionType {
	    single,
	    multi,
	    multiShift,
	}

}
declare module 'angular2-data-table' {
	export enum ClickType {
	    single,
	    double,
	}

}
declare module 'angular2-data-table' {
	export * from 'column-mode.type';
	export * from 'sort.type';
	export * from 'sort-direction.type';
	export * from 'selection.type';
	export * from 'click.type';

}
declare module 'angular2-data-table' {
	import { SortDirection } from '../types';
	export class Sort {
	    prop: string;
	    dir: SortDirection;
	    constructor(props: any);
	}

}
declare module 'angular2-data-table' {
	
	import { TableColumn } from 'table-column.model';
	import { Sort } from 'sort.model';
	import { ColumnMode, SortType, SelectionType } from '../types';
	import { TemplateRef } from '@angular/core';
	export class TableOptions {
	    columns: TableColumn[];
	    scrollbarV: boolean;
	    scrollbarH: boolean;
	    rowHeight: number;
	    detailRowHeight: number;
	    columnMode: ColumnMode;
	    emptyMessage: string;
	    headerHeight: any;
	    footerHeight: number;
	    tableHeight: number;
	    externalPaging: boolean;
	    limit: number;
	    count: number;
	    offset: number;
	    loadingIndicator: boolean;
	    selectionType: SelectionType;
	    reorderable: boolean;
	    sortType: SortType;
	    sorts: Array<Sort>;
	    rowDetailTemplate: TemplateRef<any>;
	    constructor(props: any);
	    validate(): void;
	}

}
declare module 'angular2-data-table' {
	export * from 'table-options.model';
	export * from 'table-column.model';
	export * from 'sort.model';

}
declare module 'angular2-data-table' {
	
	import { Sort } from '../models';
	import { SortType, SortDirection } from '../types';
	/**
	 * Gets the next sort direction
	 * @param  {SortType}      sortType
	 * @param  {SortDirection} currentSort
	 * @return {SortDirection}
	 */
	export function nextSortDir(sortType: SortType, current: SortDirection): SortDirection;
	/**
	 * Adapted from fueld-ui on 6/216
	 * https://github.com/FuelInteractive/fuel-ui/tree/master/src/pipes/OrderBy
	 * @param  {any}    a
	 * @param  {any}    b
	 * @return {number} position
	 */
	export function orderByComparator(a: any, b: any): number;
	/**
	 * Sorts the rows
	 * @param  {Array<any>}  rows
	 * @param  {Array<Sort>} dirs
	 * @return {Array<any>} results
	 */
	export function sortRows(rows: Array<any>, dirs: Array<Sort>): any[];

}
declare module 'angular2-data-table' {
	export * from 'id';
	export * from 'column';
	export * from 'deep-getter';
	export * from 'camel-case';
	export * from 'keys';
	export * from 'math';
	export * from 'prefixes';
	export * from 'scrollbar-width';
	export * from 'selection';
	export * from 'translate';
	export * from 'visibility-observer';
	export * from 'debounce';
	export * from 'sort';

}
declare module 'angular2-data-tablective' {
	import { TemplateRef, QueryList } from '@angular/core';
	export class DataTableColumn {
	    name: any;
	    prop: any;
	    isExpressive: any;
	    frozenLeft: any;
	    frozenRight: any;
	    flexGrow: any;
	    resizeable: any;
	    comparator: any;
	    pipe: any;
	    sortable: any;
	    draggable: any;
	    canAutoResize: any;
	    minWidth: any;
	    width: any;
	    maxWidth: any;
	    templates: QueryList<TemplateRef<any>>;
	    readonly hasHeaderTemplate: boolean;
	    readonly headerTemplate: TemplateRef<any>;
	    readonly cellTemplate: TemplateRef<any>;
	}

}
declare module 'angular2-data-table' {
	
	/**
	 * This object contains the cache of the various row heights that are present inside
	 * the data table.   Its based on Fenwick tree data structure that helps with
	 * querying sums that have time complexity of log n.
	 *
	 * Fenwick Tree Credits: http://petr-mitrichev.blogspot.com/2013/05/fenwick-tree-range-updates.html
	 * https://github.com/mikolalysenko/fenwick-tree
	 *
	 */
	export class RowHeightCache {
	    /**
	     * Tree Array stores the cumulative information of the row heights to perform efficient
	     * range queries and updates.  Currently the tree is initialized to the base row
	     * height instead of the detail row height.
	     */
	    private _treeArray;
	    /**
	     * Clear the Tree array.
	     */
	    clearCache(): void;
	    /**
	     * Initialize the Fenwick tree with row Heights.
	     *
	     * @param rows The array of rows which contain the expanded status.
	     * @param rowHeight The row height.
	     * @param detailRowHeight The detail row height.
	     */
	    initCache(rows: Array<any>, rowHeight: number, detailRowHeight: number): void;
	    /**
	     * Given the ScrollY position i.e. sum, provide the rowIndex
	     * that is present in the current view port.  Below handles edge cases.
	     *
	     * @param scrollY - The scrollY position.
	     * @returns {number} - Index representing the first row visible in the viewport
	     */
	    getRowIndex(scrollY: number): number;
	    /**
	     * When a row is expanded or rowHeight is changed, update the height.  This can
	     * be utilized in future when Angular Data table supports dynamic row heights.
	     *
	     *
	     * @param atRowIndex Update the data at this index row in the grid.
	     * @param byRowHeight Update by the rowHeight provided.
	     */
	    update(atRowIndex: number, byRowHeight: number): void;
	    /**
	     * Range Sum query from 1 to the rowIndex
	     *
	     * @param atIndex The row index until which the total height needs to be obtained.
	     * @returns {number} The total height from row 1 to the rowIndex.
	     */
	    query(atIndex: number): number;
	    /**
	     * Find the total height between 2 row indexes
	     * @param atIndexA The row index from
	     * @param atIndexB The row index to
	     * @returns {number} total pixel height between 2 row indexes.
	     */
	    queryBetween(atIndexA: number, atIndexB: number): number;
	    /**
	     * Given the ScrollY position i.e. sum, provide the rowIndex
	     * that is present in the current view port.
	     *
	     * @param sum - The scrollY position.
	     * @returns {number} - Index representing the first row visible in the viewport
	     */
	    private _getRowIndex(sum);
	}

}
declare module 'angular2-data-table' {
	
	import { EventEmitter } from '@angular/core';
	import { TableOptions, TableColumn } from '../models';
	import { RowHeightCache } from '../utils/row-height-cache';
	export class StateService {
	    options: TableOptions;
	    rows: Array<any>;
	    selected: Array<any>;
	    /**
	     * Cache the row heights for calculation during virtual scroll.
	     * @type {RowHeightCache}
	     */
	    rowHeightsCache: RowHeightCache;
	    onSortChange: EventEmitter<any>;
	    onSelectionChange: EventEmitter<any>;
	    onRowsUpdate: EventEmitter<any>;
	    onPageChange: EventEmitter<any>;
	    /**
	     * Event emitted whenever there is a change in row expansion state.
	     * @type {EventEmitter}
	     */
	    onExpandChange: EventEmitter<any>;
	    scrollbarWidth: number;
	    offsetX: number;
	    offsetY: number;
	    innerWidth: number;
	    bodyHeight: number;
	    readonly columnsByPin: {
	        left: any[];
	        center: any[];
	        right: any[];
	    };
	    readonly columnGroupWidths: {
	        left: number;
	        center: number;
	        right: number;
	        total: number;
	    };
	    readonly rowCount: number;
	    /**
	     * Property that would calculate the height of scroll bar
	     * based on the row heights cache for virtual scroll. Other scenarios
	     * calculate scroll height automatically (as height will be undefined).
	     */
	    readonly scrollHeight: number;
	    readonly pageSize: number;
	    readonly indexes: {
	        first: number;
	        last: number;
	    };
	    setSelected(selected: any[]): StateService;
	    /**
	     *  Refreshes the full Row Height cache.  Should be used
	     *  when the entire row array state has changed.
	     */
	    refreshRowHeightCache(): void;
	    setRows(rows: Array<any>): StateService;
	    setOptions(options: TableOptions): StateService;
	    setPage({type, value}: {
	        type: any;
	        value: any;
	    }): void;
	    nextSort(column: TableColumn): void;
	    getAdjustedViewPortIndex(): number;
	    /**
	     * Toggle the Expansion of the row i.e. if the row is expanded then it will
	     * collapse and vice versa.   Note that the expanded status is stored as
	     * a part of the row object itself as we have to preserve the expanded row
	     * status in case of sorting and filtering of the row set.
	     *
	     * @param row The row for which the expansion needs to be toggled.
	     */
	    toggleRowExpansion(row: any): void;
	    /**
	     * Expand/Collapse all the rows no matter what their state is.
	     *
	     * @param expanded When true, all rows are expanded and when false, all rows will be collapsed.
	     */
	    toggleAllRows(expanded: boolean): void;
	}

}
declare module 'angular2-data-table' {
	export * from 'state.service';

}
declare module 'angular2-data-tabletemplate.directive' {
	import { TemplateRef } from '@angular/core';
	export class DatatableRowDetailTemplate {
	    template: TemplateRef<any>;
	    readonly rowDetailTemplate: TemplateRef<any>;
	}

}
declare module 'angular2-data-table' {
	import { ElementRef, EventEmitter, KeyValueDiffers, OnInit, OnChanges, QueryList, DoCheck, AfterViewInit, Renderer } from '@angular/core';
	import { TableOptions } from '../models';
	import { DataTableColumn } from 'datatable-column.directive';
	import { StateService } from '../services';
	export class DataTable implements OnInit, OnChanges, DoCheck, AfterViewInit {
	    state: StateService;
	    options: TableOptions;
	    rows: any[];
	    selected: any[];
	    onPageChange: EventEmitter<any>;
	    onRowsUpdate: EventEmitter<any>;
	    onRowClick: EventEmitter<any>;
	    onSelectionChange: EventEmitter<any>;
	    onColumnChange: EventEmitter<any>;
	    columns: QueryList<DataTableColumn>;
	    rowDetailTemplateChild: any;
	    private element;
	    private rowDiffer;
	    private colDiffer;
	    private pageSubscriber;
	    constructor(state: StateService, renderer: Renderer, element: ElementRef, differs: KeyValueDiffers);
	    ngOnInit(): void;
	    ngAfterViewInit(): void;
	    ngOnChanges(changes: any): void;
	    ngDoCheck(): void;
	    ngOnDestroy(): void;
	    checkColumnChanges(): void;
	    adjustSizes(): void;
	    /**
	     * Toggle the expansion of the row
	     *
	     * @param rowIndex
	     */
	    toggleExpandRow(row: any): void;
	    /**
	     * API method to expand all the rows.
	     */
	    expandAllRows(): void;
	    /**
	     * API method to collapse all the rows.
	     */
	    collapseAllRows(): void;
	    adjustColumns(forceIdx?: number): void;
	    onRowSelect(event: any): void;
	    resize(): void;
	    readonly isFixedHeader: boolean;
	    readonly isFixedRow: boolean;
	    readonly isVertScroll: boolean;
	    readonly isHorScroll: boolean;
	    readonly isSelectable: boolean;
	}

}
declare module 'angular2-data-tablent' {
	import { ElementRef, Renderer, EventEmitter } from '@angular/core';
	import { StateService } from '../../services';
	export class DataTableHeader {
	    private state;
	    onColumnChange: EventEmitter<any>;
	    readonly headerWidth: string;
	    readonly headerHeight: any;
	    constructor(state: StateService, element: ElementRef, renderer: Renderer);
	    trackColBy(index: number, obj: any): any;
	    columnResized(width: any, column: any): void;
	    columnReordered({prevIndex, newIndex, model}: {
	        prevIndex: any;
	        newIndex: any;
	        model: any;
	    }): void;
	    stylesByGroup(group: any): {
	        width: string;
	    };
	}

}
declare module 'angular2-data-tablemponent' {
	
	import { ElementRef, EventEmitter, Renderer } from '@angular/core';
	import { StateService } from '../../services';
	import { TableColumn } from '../../models';
	import { SortDirection } from '../../types';
	export class DataTableHeaderCell {
	    element: ElementRef;
	    private state;
	    column: TableColumn;
	    onColumnChange: EventEmitter<any>;
	    readonly width: number;
	    readonly minWidth: number;
	    readonly maxWidth: number;
	    readonly height: any;
	    readonly colTitle: string;
	    readonly cssClasses: string;
	    sort: Function;
	    readonly sortDir: SortDirection;
	    readonly name: string;
	    constructor(element: ElementRef, state: StateService, renderer: Renderer);
	    sortClasses(sort: any): {
	        'sort-asc icon-down': boolean;
	        'sort-desc icon-up': boolean;
	    };
	    onSort(): void;
	}

}
declare module 'angular2-data-table' {
	import { ElementRef, EventEmitter } from '@angular/core';
	/**
	 * Draggable Directive for Angular2
	 *
	 * Inspiration:
	 *   https://github.com/AngularClass/angular2-examples/blob/master/rx-draggable/directives/draggable.ts
	 *   http://stackoverflow.com/questions/35662530/how-to-implement-drag-and-drop-in-angular2
	 *
	 */
	export class Draggable {
	    element: HTMLElement;
	    model: any;
	    dragX: boolean;
	    dragY: boolean;
	    onDragStart: EventEmitter<any>;
	    onDragging: EventEmitter<any>;
	    onDragEnd: EventEmitter<any>;
	    private dragging;
	    private subscription;
	    constructor(element: ElementRef);
	    ngOnDestroy(): void;
	    onMouseup(event: any): void;
	    onMousedown(event: any): void;
	    move(event: any, mouseDownPos: any): void;
	}

}
declare module 'angular2-data-table' {
	import { EventEmitter } from '@angular/core';
	export class LongPress {
	    duration: number;
	    onLongPress: EventEmitter<any>;
	    onLongPressing: EventEmitter<any>;
	    onLongPressEnd: EventEmitter<any>;
	    private pressing;
	    private longPressing;
	    private timeout;
	    private mouseX;
	    private mouseY;
	    readonly press: boolean;
	    readonly longPress: boolean;
	    onMouseDown(event: any): void;
	    onMouseMove(event: any): void;
	    loop(event: any): void;
	    endPress(): void;
	    onMouseUp(): void;
	}

}
declare module 'angular2-data-table' {
	import { EventEmitter } from '@angular/core';
	export class Orderable {
	    onReorder: EventEmitter<any>;
	    private drags;
	    private positions;
	    ngAfterContentInit(): void;
	    onDragStart(): void;
	    onDragEnd({element, model}: {
	        element: any;
	        model: any;
	    }): void;
	}

}
declare module 'angular2-data-table' {
	import { ElementRef, EventEmitter } from '@angular/core';
	export class Resizeable {
	    resizeEnabled: boolean;
	    minWidth: number;
	    maxWidth: number;
	    onResize: EventEmitter<any>;
	    private element;
	    private subscription;
	    private resizing;
	    constructor(element: ElementRef);
	    ngOnDestroy(): void;
	    onMouseup(): void;
	    onMousedown(event: any): void;
	    move(event: any, initialWidth: any, mouseDownScreenX: any): void;
	}

}
declare module 'angular2-data-table' {
	import { ElementRef, EventEmitter, OnInit, OnDestroy } from '@angular/core';
	export class Scroller implements OnInit, OnDestroy {
	    rowHeight: number;
	    count: number;
	    limit: number;
	    scrollWidth: number;
	    scrollbarV: boolean;
	    scrollbarH: boolean;
	    onScroll: EventEmitter<any>;
	    /**
	     * The height of the scroll bar.
	     */
	    scrollHeight: number;
	    private scrollYPos;
	    private scrollXPos;
	    private prevScrollYPos;
	    private prevScrollXPos;
	    private element;
	    private parentElement;
	    constructor(element: ElementRef);
	    ngOnInit(): void;
	    ngOnDestroy(): void;
	    setOffset(offsetY: number): void;
	    onScrolled(event: any): void;
	    updateOffset(): void;
	}

}
declare module 'angular2-data-table' {
	import { EventEmitter, ElementRef } from '@angular/core';
	/**
	 * Visibility Observer Directive
	 *
	 * Usage:
	 *
	 * 		<div
	 * 			visibility-observer
	 * 			(onVisibilityChange)="doSomething($event)">
	 * 		</div>
	 *
	 */
	export class Visibility {
	    visible: boolean;
	    onVisibilityChange: EventEmitter<any>;
	    constructor(element: ElementRef);
	    visbilityChange(): void;
	}

}
declare module 'angular2-data-table' {
	export * from 'draggable.directive';
	export * from 'long-press.directive';
	export * from 'orderable.directive';
	export * from 'resizeable.directive';
	export * from 'scroller.directive';
	export * from 'visibility.directive';

}
declare module 'angular2-data-table' {
	import { EventEmitter, OnInit, OnDestroy, ElementRef, Renderer } from '@angular/core';
	import { StateService } from '../../services';
	import { Scroller } from '../../directives';
	export class DataTableBody implements OnInit, OnDestroy {
	    state: StateService;
	    onRowClick: EventEmitter<any>;
	    onRowSelect: EventEmitter<any>;
	    scroller: Scroller;
	    rows: any;
	    private prevIndex;
	    private sub;
	    readonly selectEnabled: boolean;
	    readonly bodyHeight: string;
	    readonly bodyWidth: string;
	    constructor(state: StateService, element: ElementRef, renderer: Renderer);
	    ngOnInit(): void;
	    trackRowBy(index: number, obj: any): any;
	    onBodyScroll(props: any): void;
	    updatePage(direction: any): void;
	    updateRows(refresh?: boolean): void;
	    /**
	     * Calculate row height based on the expanded state of the row.
	     *
	     * @param row  the row for which the height need to be calculated.
	     * @returns {number}  height of the row.
	     */
	    getRowHeight(row: any): number;
	    /**
	     * Calculates the styles for the row so that the rows can be moved in 2D space
	     * during virtual scroll inside the DOM.   In the below case the Y position is
	     * manipulated.   As an example, if the height of row 0 is 30 px and row 1 is
	     * 100 px then following styles are generated:
	     *
	     * transform: translate3d(0px, 0px, 0px);    ->  row0
	     * transform: translate3d(0px, 30px, 0px);   ->  row1
	     * transform: translate3d(0px, 130px, 0px);  ->  row2
	     *
	     * Row heights have to be calculated based on the row heights cache as we wont
	     * be able to determine which row is of what height before hand.  In the above
	     * case the positionY of the translate3d for row2 would be the sum of all the
	     * heights of the rows before it (i.e. row0 and row1).
	     *
	     * @param row The row that needs to be placed in the 2D space.
	     * @returns {{styles: string}}  Returns the CSS3 style to be applied
	     */
	    getRowsStyles(row: any): {
	        height: string;
	    };
	    hideIndicator(): void;
	    rowClicked(event: any, index: any, row: any): void;
	    rowKeydown(event: any, index: any, row: any): void;
	    selectRow(event: any, index: any, row: any): void;
	    ngOnDestroy(): void;
	}

}
declare module 'angular2-data-tableent' {
	import { TableColumn } from '../../models';
	import { StateService } from '../../services';
	import { SortDirection } from '../../types';
	export class DataTableBodyCell {
	    private state;
	    column: TableColumn;
	    row: any;
	    readonly cssClasses: string;
	    readonly width: any;
	    readonly height: any;
	    readonly sortDir: SortDirection;
	    readonly value: any;
	    constructor(state: StateService);
	}

}
declare module 'angular2-data-tablent' {
	import { ElementRef, Renderer } from '@angular/core';
	import { StateService } from '../../services';
	export class DataTableBodyRow {
	    state: StateService;
	    row: any;
	    readonly isSelected: boolean;
	    constructor(state: StateService, element: ElementRef, renderer: Renderer);
	    trackColBy(index: number, obj: any): any;
	    stylesByGroup(group: any): {
	        width: string;
	    };
	}

}
declare module 'angular2-data-tableponent' {
	export class ProgressBar {
	}

}
declare module 'angular2-data-tablent' {
	import { EventEmitter, ElementRef, Renderer } from '@angular/core';
	import { StateService } from '../../services';
	export class DataTableFooter {
	    private state;
	    onPageChange: EventEmitter<any>;
	    readonly visible: boolean;
	    readonly curPage: number;
	    constructor(element: ElementRef, state: StateService, renderer: Renderer);
	}

}
declare module 'angular2-data-tablet' {
	import { EventEmitter, Renderer, ElementRef } from '@angular/core';
	export class DataTablePager {
	    size: number;
	    onPaged: EventEmitter<any>;
	    private _count;
	    private _page;
	    private pages;
	    readonly totalPages: number;
	    count: number;
	    page: number;
	    constructor(element: ElementRef, renderer: Renderer);
	    canPrevious(): boolean;
	    canNext(): boolean;
	    prevPage(): void;
	    nextPage(): void;
	    selectPage(page: number): void;
	    calcPages(page?: number): any[];
	}

}
declare module 'angular2-data-table.component' {
	import { Renderer, ElementRef } from '@angular/core';
	import { StateService } from '../../services';
	export class DataTableRowWrapper {
	    element: ElementRef;
	    private state;
	    /**
	     * The row for which the detail needs to be shown.
	     */
	    row: any;
	    constructor(element: ElementRef, state: StateService, renderer: Renderer);
	}

}
declare module 'angular2-data-table' {
	export * from 'datatable.component';
	export * from 'datatable-column.directive';
	export * from 'header/header.component';
	export * from 'header/header-cell.component';
	export * from 'body/body.component';
	export * from 'body/body-cell.component';
	export * from 'body/body-row.component';
	export * from 'body/progress-bar.component';
	export * from 'footer/footer.component';
	export * from 'footer/pager.component';
	export * from 'body/body-row-wrapper.component';
	export * from 'datatable-row-detail-template.directive';

}
declare module 'angular2-data-table' {
	export * from 'types';
	export * from 'models';
	export * from 'components';
	export class Angular2DataTableModule {
	}

}
