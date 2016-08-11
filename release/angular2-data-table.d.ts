/// <reference types="core-js" />
declare module "utils/column" {
    export function columnsByPin(cols: any): {
        left: any[];
        center: any[];
        right: any[];
    };
    export function columnGroupWidths(groups: any, all: any): {
        left: number;
        center: number;
        right: number;
        total: number;
    };
    export function columnTotalWidth(columns: any, prop?: any): number;
}
declare module "utils/math" {
    export function columnTotalWidth(columns: any, prop?: any): number;
    export function getTotalFlexGrow(columns: any): number;
    export function adjustColumnWidths(allColumns: any, expectedWidth: any): void;
    export function forceFillColumnWidths(allColumns: any, expectedWidth: any, startIdx: any): void;
}
declare module "enums/ColumnMode" {
    export enum ColumnMode {
        standard,
        flex,
        force,
    }
}
declare module "utils/id" {
    export function id(): string;
}
declare module "utils/camelCase" {
    export function camelCase(str: any): any;
}
declare module "models/TableColumn" {
    import { PipeTransform } from '@angular/core';
    export class TableColumn {
        static getProps(): string[];
        $$id: string;
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
        template: any;
        constructor(props?: any);
    }
}
declare module "enums/SortDirection" {
    export enum SortDirection {
        asc,
        desc,
    }
}
declare module "models/Sort" {
    import { SortDirection } from "enums/SortDirection";
    export class Sort {
        prop: string;
        dir: SortDirection;
        constructor(props: any);
    }
}
declare module "enums/SortType" {
    export enum SortType {
        single,
        multi,
    }
}
declare module "enums/SelectionType" {
    export enum SelectionType {
        single,
        multi,
        multiShift,
    }
}
declare module "models/TableOptions" {
    import { TableColumn } from "models/TableColumn";
    import { Sort } from "models/Sort";
    import { ColumnMode } from "enums/ColumnMode";
    import { SortType } from "enums/SortType";
    import { SelectionType } from "enums/SelectionType";
    export class TableOptions {
        columns: TableColumn[];
        scrollbarV: boolean;
        scrollbarH: boolean;
        rowHeight: number;
        columnMode: ColumnMode;
        loadingMessage: string;
        emptyMessage: string;
        headerHeight: number | string;
        footerHeight: number;
        externalPaging: boolean;
        limit: number;
        count: number;
        offset: number;
        loadingIndicator: boolean;
        selectionType: SelectionType;
        reorderable: boolean;
        sortType: SortType;
        sorts: Array<Sort>;
        constructor(props: any);
    }
}
declare module "components/DataTableColumn" {
    import { TemplateRef, QueryList } from '@angular/core';
    export class DataTableColumn {
        template: QueryList<TemplateRef<any>>;
    }
}
declare module "utils/scrollbarWidth" {
    export function scrollbarWidth(): number;
}
declare module "utils/sort" {
    import { Sort } from "models/Sort";
    import { SortType } from "enums/SortType";
    import { SortDirection } from "enums/SortDirection";
    export function nextSortDir(sortType: SortType, current: SortDirection): SortDirection;
    export function orderByComparator(a: any, b: any): number;
    export function sortRows(rows: Array<any>, dirs: Array<Sort>): any[];
}
declare module "services/State" {
    import { EventEmitter } from '@angular/core';
    import { TableOptions } from "models/TableOptions";
    import { TableColumn } from "models/TableColumn";
    export class StateService {
        options: TableOptions;
        rows: Array<any>;
        selected: Array<any>;
        onSelectionChange: EventEmitter<any>;
        onRowsUpdate: EventEmitter<any>;
        onPageChange: EventEmitter<any>;
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
        readonly pageCount: number;
        readonly pageSize: number;
        readonly indexes: {
            first: number;
            last: number;
        };
        setSelected(selected: any[]): this;
        setRows(rows: Array<any>): this;
        setOptions(options: TableOptions): this;
        setPage(page: number): void;
        nextSort(column: TableColumn): void;
    }
}
declare module "components/DataTable" {
    import { ElementRef, EventEmitter, KeyValueDiffers, OnInit, QueryList, DoCheck, AfterViewInit } from '@angular/core';
    import { TableOptions } from "models/TableOptions";
    import './datatable.scss';
    import { DataTableColumn } from "components/DataTableColumn";
    import { StateService } from "services/State";
    export class DataTable implements OnInit, DoCheck, AfterViewInit {
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
        private element;
        private rowDiffer;
        private colDiffer;
        constructor(element: ElementRef, state: StateService, differs: KeyValueDiffers);
        ngOnInit(): void;
        ngAfterViewInit(): void;
        ngDoCheck(): void;
        checkColumnToggles(): void;
        adjustSizes(): void;
        adjustColumns(forceIdx?: number): void;
        onPageChanged(event: any): void;
        onRowSelect(event: any): void;
        resize(): void;
        readonly isFixedHeader: boolean;
        readonly isFixedRow: boolean;
        readonly isVertScroll: boolean;
        readonly isHorScroll: boolean;
        readonly isSelectable: boolean;
        readonly isCheckboxable: boolean;
    }
}
declare module "directives/LongPress" {
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
declare module "directives/Draggable" {
    import { ElementRef, EventEmitter } from '@angular/core';
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
        onMouseup(event: any): void;
        onMousedown(event: any): void;
        move(event: any, mouseDownPos: any): void;
    }
}
declare module "directives/Resizeable" {
    import { ElementRef, EventEmitter } from '@angular/core';
    export class Resizeable {
        resizeEnabled: boolean;
        minWidth: number;
        maxWidth: number;
        onResize: EventEmitter<any>;
        private element;
        private subscription;
        private prevScreenX;
        private resizing;
        constructor(element: ElementRef);
        onMouseup(): void;
        onMousedown(event: any): void;
        move(event: any): void;
    }
}
declare module "directives/Orderable" {
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
declare module "components/header/HeaderCell" {
    import { ElementRef, EventEmitter } from '@angular/core';
    import { StateService } from "services/State";
    import { TableColumn } from "models/TableColumn";
    import { SortDirection } from "enums/SortDirection";
    export class DataTableHeaderCell {
        element: ElementRef;
        private state;
        model: TableColumn;
        onColumnChange: EventEmitter<any>;
        readonly sortDir: SortDirection;
        constructor(element: ElementRef, state: StateService);
        sortClasses(sort: any): {
            'sort-asc icon-down': boolean;
            'sort-desc icon-up': boolean;
        };
        onSort(): void;
    }
}
declare module "components/header/Header" {
    import { ElementRef, EventEmitter } from '@angular/core';
    import { StateService } from "services/State";
    export class DataTableHeader {
        private state;
        onColumnChange: EventEmitter<any>;
        readonly headerWidth: string;
        readonly headerHeight: number | string;
        constructor(state: StateService, elm: ElementRef);
        columnResized(width: any, column: any): void;
        columnReordered({prevIndex, newIndex, model}: {
            prevIndex: any;
            newIndex: any;
            model: any;
        }): void;
    }
}
declare module "utils/keys" {
    export enum Keys {
        up = 38,
        down = 40,
        return = 13,
        escape = 27,
    }
}
declare module "utils/selection" {
    export function selectRows(selected: any, row: any): any;
    export function selectRowsBetween(selected: any, rows: any, index: any, prevIndex: any): any;
}
declare module "components/body/Body" {
    import { EventEmitter, OnInit, OnDestroy, ElementRef } from '@angular/core';
    import { StateService } from "services/State";
    export class DataTableBody implements OnInit, OnDestroy {
        state: StateService;
        onRowClick: EventEmitter<any>;
        onRowSelect: EventEmitter<any>;
        rows: any;
        private prevIndex;
        private sub;
        readonly selectEnabled: boolean;
        constructor(state: StateService, element: ElementRef);
        readonly bodyHeight: string;
        readonly bodyWidth: string;
        ngOnInit(): void;
        hideIndicator(): void;
        rowClicked(event: any, index: any, row: any): void;
        rowKeydown(event: any, index: any, row: any): void;
        selectRow(event: any, index: any, row: any): void;
        ngOnDestroy(): void;
    }
}
declare module "components/footer/Footer" {
    import { EventEmitter, ElementRef } from '@angular/core';
    import { StateService } from "services/State";
    export class DataTableFooter {
        private state;
        onPageChange: EventEmitter<any>;
        readonly visible: boolean;
        readonly curPage: number;
        constructor(elm: ElementRef, state: StateService);
    }
}
declare module "components/footer/Pager" {
    import { EventEmitter, ElementRef } from '@angular/core';
    export class DataTablePager {
        size: number;
        onPaged: EventEmitter<any>;
        private _count;
        private _page;
        private pages;
        readonly totalPages: number;
        count: number;
        page: number;
        constructor(elm: ElementRef);
        canPrevious(): boolean;
        canNext(): boolean;
        prevPage(): void;
        nextPage(): void;
        selectPage(page: number): void;
        calcPages(page?: number): any[];
    }
}
declare module "components/body/BodyRow" {
    import { ElementRef } from '@angular/core';
    import { StateService } from "services/State";
    export class DataTableBodyRow {
        state: StateService;
        row: any;
        readonly isSelected: boolean;
        constructor(state: StateService, element: ElementRef);
    }
}
declare module "components/body/ProgressBar" {
    export class ProgressBar {
    }
}
declare module "utils/deepGetter" {
    export function deepValueGetter(obj: any, path: any): any;
}
declare module "components/body/BodyCell" {
    import { ElementRef } from '@angular/core';
    import { TableColumn } from "models/TableColumn";
    export class DataTableBodyCell {
        column: TableColumn;
        row: any;
        constructor(element: ElementRef);
        readonly value: any;
        readonly width: string;
    }
}
declare module "utils/VisibilityObserver" {
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
declare module "directives/Visibility" {
    import { EventEmitter, ElementRef } from '@angular/core';
    export class Visibility {
        visible: boolean;
        onVisibilityChange: EventEmitter<any>;
        constructor(element: ElementRef);
        visbilityChange(): void;
    }
}
declare module "directives/Scroller" {
    import { ElementRef } from '@angular/core';
    export class Scroller {
        rowHeight: number;
        count: number;
        scrollWidth: number;
        readonly scrollHeight: string;
        constructor(elm: ElementRef);
    }
}
declare module "directives/TemplateWrapper" {
    import { TemplateRef, ViewContainerRef, SimpleChange } from '@angular/core';
    export class TemplateWrapper {
        private viewContainer;
        templateWrapper: TemplateRef<any>;
        value: any;
        row: any;
        column: any;
        private embeddedViewRef;
        constructor(viewContainer: ViewContainerRef);
        ngOnChanges(changes: {
            [key: string]: SimpleChange;
        }): void;
    }
}
declare module "angular2-data-table" {
    import { ColumnMode } from "enums/ColumnMode";
    import { SortType } from "enums/SortType";
    import { SortDirection } from "enums/SortDirection";
    import { SelectionType } from "enums/SelectionType";
    import { TableOptions } from "models/TableOptions";
    import { TableColumn } from "models/TableColumn";
    import { Sort } from "models/Sort";
    export class Angular2DataTableModule {
    }
    export { TableOptions, TableColumn, Sort, SelectionType, ColumnMode, SortDirection, SortType };
}
