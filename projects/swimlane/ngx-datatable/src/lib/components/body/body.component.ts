import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  EventEmitter,
  HostBinding,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  signal,
  TemplateRef,
  TrackByFunction,
  ViewChild
} from '@angular/core';
import { ScrollerComponent } from './scroller.component';
import { columnGroupWidths, columnsByPin } from '../../utils/column';
import { RowHeightCache } from '../../utils/row-height-cache';
import { NgTemplateOutlet } from '@angular/common';
import { DatatableGroupHeaderDirective } from './body-group-header.directive';
import { DatatableRowDetailDirective } from '../row-detail/row-detail.directive';
import { DataTableBodyRowComponent } from './body-row.component';
import { ColumnGroupWidth, TableColumnInternal } from '../../types/internal.types';
import {
  ActivateEvent,
  DragEventData,
  Group,
  Row,
  RowOrGroup,
  ScrollEvent,
  SelectEvent,
  SelectionType
} from '../../types/public.types';
import { DraggableDirective } from '../../directives/draggable.directive';
import { DatatableRowDefInternalDirective } from './body-row-def.component';
import { DataTableRowWrapperComponent } from './body-row-wrapper.component';
import { DataTableSummaryRowComponent } from './summary/summary-row.component';
import { DataTableGhostLoaderComponent } from './ghost-loader/ghost-loader.component';
import { DatatableBodyRowDirective } from './body-row.directive';
import { selectRows, selectRowsBetween } from '../../utils/selection';
import { Keys } from '../../utils/keys';

@Component({
  selector: 'datatable-body',
  template: `
    @if (loadingIndicator) {
      <div class="custom-loading-indicator-wrapper">
        <div class="custom-loading-content">
          <ng-content select="[loading-indicator]"></ng-content>
        </div>
      </div>
    }
    @if (ghostLoadingIndicator && (!rowCount || !virtualization || !scrollbarV)) {
      <ghost-loader
        class="ghost-overlay"
        [columns]="columns"
        [pageSize]="pageSize"
        [rowHeight]="rowHeight"
        [ghostBodyHeight]="bodyHeight"
      >
      </ghost-loader>
    }
    @if (rows.length) {
      <datatable-scroller
        [scrollbarV]="scrollbarV"
        [scrollbarH]="scrollbarH"
        [scrollHeight]="scrollHeight()"
        [scrollWidth]="columnGroupWidths?.total"
        (scroll)="onBodyScroll($event)"
      >
        @if (summaryRow && summaryPosition === 'top') {
          <datatable-summary-row
            [rowHeight]="summaryHeight"
            [innerWidth]="innerWidth"
            [rows]="rows"
            [columns]="columns"
          >
          </datatable-summary-row>
        }
        <ng-template
          ngx-datatable-body-row
          #bodyRow
          let-row="row"
          let-index="index"
          let-indexInGroup="indexInGroup"
          let-groupedRows="groupedRows"
          let-disabled="disabled"
        >
          <datatable-body-row
            role="row"
            tabindex="-1"
            #rowElement
            [disabled]="disabled"
            [isSelected]="getRowSelected(row)"
            [innerWidth]="innerWidth"
            [columns]="columns"
            [rowHeight]="getRowHeight(row)"
            [row]="row"
            [group]="groupedRows"
            [rowIndex]="{ index: index, indexInGroup: indexInGroup }"
            [expanded]="getRowExpanded(row)"
            [rowClass]="rowClass"
            [displayCheck]="displayCheck"
            [treeStatus]="row?.treeStatus"
            [draggable]="rowDraggable"
            [verticalScrollVisible]="verticalScrollVisible"
            (treeAction)="onTreeAction(row)"
            (activate)="onActivate($event, index)"
            (drop)="drop($event, row, rowElement)"
            (dragover)="dragOver($event, row)"
            (dragenter)="dragEnter($event, row, rowElement)"
            (dragleave)="dragLeave($event, row, rowElement)"
            (dragstart)="drag($event, row, rowElement)"
            (dragend)="dragEnd($event, row)"
          >
          </datatable-body-row>
        </ng-template>

        <div [style.transform]="renderOffset()">
          @for (group of rowsToRender(); track rowTrackingFn(i, group); let i = $index) {
            @if (!group && ghostLoadingIndicator) {
              <ghost-loader cellMode [columns]="columns" [pageSize]="1" [rowHeight]="rowHeight" />
            } @else if (group) {
              @let disabled = isRow(group) && disableRowCheck && disableRowCheck(group);
              <!-- $any(group) is needed as the typing is broken and the feature as well. See #147. -->
              <!-- FIXME: This has to be revisited and fixed. -->
              <datatable-row-wrapper
                [attr.hidden]="
                  ghostLoadingIndicator && (!rowCount || !virtualization || !scrollbarV)
                    ? true
                    : null
                "
                [groupedRows]="groupedRows"
                [innerWidth]="innerWidth"
                [style.width]="groupedRows ? columnGroupWidths.total : undefined"
                [rowDetail]="rowDetail"
                [groupHeader]="groupHeader"
                [offsetX]="offsetX"
                [detailRowHeight]="getDetailRowHeight(group && $any(group)[i], i)"
                [groupHeaderRowHeight]="getGroupHeaderRowHeight(group && $any(group)[i], i)"
                [row]="group"
                [disabled]="disabled"
                [expanded]="getRowExpanded(group)"
                [rowIndex]="indexes().first + i"
                [selected]="selected"
                (rowContextmenu)="rowContextmenu.emit($event)"
              >
                @if (rowDefTemplate) {
                  <ng-container
                    *rowDefInternal="
                      {
                        template: rowDefTemplate,
                        rowTemplate: bodyRow,
                        row: group,
                        index: i
                      };
                      disabled: disabled
                    "
                  />
                } @else {
                  @if (isRow(group)) {
                    <ng-container
                      [ngTemplateOutlet]="bodyRow"
                      [ngTemplateOutletContext]="{
                        row: group,
                        index: indexes().first + i,
                        disabled
                      }"
                    ></ng-container>
                  }
                }

                @if (isGroup(group)) {
                  <!-- The row typecast is due to angular compiler acting weird. It is obvious that it is of type TRow, but the compiler does not understand. -->
                  @for (row of group.value; track rowTrackingFn($index, row)) {
                    @let disabled = disableRowCheck && disableRowCheck(row);
                    <ng-container
                      [ngTemplateOutlet]="bodyRow"
                      [ngTemplateOutletContext]="{
                        row,
                        groupedRows: group?.value,
                        index: indexes().first + i,
                        indexInGroup: $index,
                        disabled
                      }"
                    ></ng-container>
                  }
                }
              </datatable-row-wrapper>
            }
          }
        </div>
      </datatable-scroller>
      @if (summaryRow && summaryPosition === 'bottom') {
        <datatable-summary-row
          role="row"
          [rowHeight]="summaryHeight"
          [innerWidth]="innerWidth"
          [rows]="rows"
          [columns]="columns"
        >
        </datatable-summary-row>
      }
    }
    @if (!rows?.length && !loadingIndicator && !ghostLoadingIndicator) {
      <datatable-scroller
        [scrollbarV]="scrollbarV"
        [scrollbarH]="scrollbarH"
        [scrollHeight]="scrollHeight()"
        [style.width]="scrollbarH ? columnGroupWidths?.total + 'px' : '100%'"
        (scroll)="onBodyScroll($event)"
      >
        <ng-content select="[empty-content]"></ng-content>
      </datatable-scroller>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'datatable-body'
  },
  styleUrl: './body.component.scss',
  imports: [
    DataTableGhostLoaderComponent,
    ScrollerComponent,
    DataTableSummaryRowComponent,
    DataTableRowWrapperComponent,
    DatatableRowDefInternalDirective,
    DataTableBodyRowComponent,
    DraggableDirective,
    NgTemplateOutlet,
    DatatableBodyRowDirective
  ]
})
export class DataTableBodyComponent<TRow extends Row = any> implements OnInit, OnDestroy {
  cd = inject(ChangeDetectorRef);

  @Input() rowDefTemplate?: TemplateRef<any>;
  @Input() scrollbarV?: boolean;
  @Input() scrollbarH?: boolean;
  @Input() loadingIndicator?: boolean;
  @Input() ghostLoadingIndicator?: boolean;
  @Input() externalPaging?: boolean;
  @Input() rowHeight!: number | 'auto' | ((row?: any) => number);
  @Input() offsetX!: number;
  @Input() selectionType?: SelectionType;
  @Input() selected: any[] = [];
  @Input() rowIdentity!: (x: RowOrGroup<TRow>) => unknown;
  @Input() rowDetail?: DatatableRowDetailDirective;
  @Input() groupHeader?: DatatableGroupHeaderDirective;
  @Input() selectCheck?: (value: TRow, index: number, array: TRow[]) => boolean;
  @Input() displayCheck?: (row: TRow, column: TableColumnInternal, value?: any) => boolean;
  @Input() trackByProp?: string;
  @Input() rowClass?: (row: TRow) => string | Record<string, boolean>;
  @Input() groupedRows?: Group<TRow>[];
  @Input() groupExpansionDefault?: boolean;
  @Input() innerWidth!: number;
  @Input() groupRowsBy?: keyof TRow;
  @Input() virtualization?: boolean;
  @Input() summaryRow?: boolean;
  @Input() summaryPosition!: string;
  @Input() summaryHeight!: number;
  @Input() rowDraggable?: boolean;
  @Input() rowDragEvents!: EventEmitter<DragEventData>;
  @Input() disableRowCheck?: (row: TRow) => boolean | undefined;

  @Input() set pageSize(val: number) {
    if (val !== this._pageSize) {
      this._pageSize = val;
      this.recalcLayout();

      // Emits the page event if page size has been changed
      this._offsetEvent = -1;
      this.updatePage('up');
      this.updatePage('down');
    }
  }

  get pageSize(): number {
    return this._pageSize;
  }

  @Input() set rows(val: (TRow | undefined)[]) {
    if (val !== this._rows) {
      this._rows = val;
      this.recalcLayout();
    }
  }

  get rows(): (TRow | undefined)[] {
    return this._rows;
  }

  @Input() set columns(val: TableColumnInternal[]) {
    if (val !== this._columns) {
      this._columns = val;
      this.updateColumnGroupWidths();
    }
  }

  get columns(): any[] {
    return this._columns;
  }

  @Input() set offset(val: number) {
    if (val !== this._offset) {
      this._offset = val;
      if (!this.scrollbarV || (this.scrollbarV && !this.virtualization)) {
        this.recalcLayout();
      }
    }
  }

  get offset(): number {
    return this._offset;
  }

  @Input() set rowCount(val: number) {
    if (val !== this._rowCount) {
      this._rowCount = val;
      this.recalcLayout();
    }
  }

  get rowCount(): number {
    return this._rowCount;
  }

  @HostBinding('style.width')
  get bodyWidth(): string {
    if (this.scrollbarH) {
      return this.innerWidth + 'px';
    } else {
      return '100%';
    }
  }

  @Input()
  @HostBinding('style.height')
  set bodyHeight(val: number | string) {
    if (this.scrollbarV) {
      this._bodyHeight = val + 'px';
    } else {
      this._bodyHeight = 'auto';
    }

    this.recalcLayout();
  }

  get bodyHeight() {
    return this._bodyHeight;
  }

  @Input() verticalScrollVisible = false;

  @Output() scroll = new EventEmitter<ScrollEvent>();
  @Output() page = new EventEmitter<number>();
  @Output() activate = new EventEmitter<ActivateEvent<TRow>>();
  @Output() select = new EventEmitter<SelectEvent<TRow>>();
  @Output() rowContextmenu = new EventEmitter<{ event: MouseEvent; row: RowOrGroup<TRow> }>(false);
  @Output() treeAction: EventEmitter<{ row: TRow }> = new EventEmitter();

  @ViewChild(ScrollerComponent) scroller!: ScrollerComponent;

  /**
   * Returns if selection is enabled.
   */
  get selectEnabled(): boolean {
    return !!this.selectionType;
  }

  /**
   * Property that would calculate the height of scroll bar
   * based on the row heights cache for virtual scroll and virtualization. Other scenarios
   * calculate scroll height automatically (as height will be undefined).
   */
  scrollHeight = computed(() => {
    if (this.rowHeightsCache() && this.scrollbarV && this.virtualization && this.rowCount) {
      return this.rowHeightsCache().query(this.rowCount - 1);
    }
    // avoid TS7030: Not all code paths return a value.
    return undefined;
  });

  rowsToRender = computed(() => {
    return this.updateRows();
  });
  rowHeightsCache = signal(new RowHeightCache());
  offsetY = 0;
  indexes = signal<{ first: number; last: number }>({ first: 0, last: 0 });
  columnGroupWidths!: ColumnGroupWidth;
  rowTrackingFn: TrackByFunction<RowOrGroup<TRow> | undefined>;
  listener: any;
  rowExpansions: any[] = [];

  _rows!: (TRow | undefined)[];
  _bodyHeight!: string;
  _columns!: TableColumnInternal[];
  _rowCount!: number;
  _offset!: number;
  _pageSize!: number;
  _offsetEvent = -1;

  private _draggedRow?: RowOrGroup<TRow>;
  private _draggedRowElement?: HTMLElement;

  /**
   * Creates an instance of DataTableBodyComponent.
   */
  constructor() {
    // declare fn here so we can get access to the `this` property
    this.rowTrackingFn = (index, row) => {
      if (this.ghostLoadingIndicator) {
        return index;
      }
      if (this.trackByProp && row) {
        return (row as any)[this.trackByProp];
      } else {
        return row;
      }
    };
  }

  /**
   * Called after the constructor, initializing input properties
   */
  ngOnInit(): void {
    if (this.rowDetail) {
      this.listener = this.rowDetail.toggle.subscribe(
        ({ type, value }: { type: string; value: any }) => this.toggleStateChange(type, value)
      );
    }

    if (this.groupHeader) {
      this.listener = this.groupHeader.toggle.subscribe(
        ({ type, value }: { type: string; value: any }) => {
          // Remove default expansion state once user starts manual toggle.
          this.groupExpansionDefault = false;
          this.toggleStateChange(type, value);
        }
      );
    }
  }

  private toggleStateChange(type: string, value: any) {
    if (type === 'group' || type === 'row') {
      this.toggleRowExpansion(value);
    }
    if (type === 'all') {
      this.toggleAllRows(value);
    }

    // Refresh rows after toggle
    // Fixes #883
    this.updateIndexes();
    this.cd.markForCheck();
  }

  /**
   * Called once, before the instance is destroyed.
   */
  ngOnDestroy(): void {
    if (this.rowDetail || this.groupHeader) {
      this.listener.unsubscribe();
    }
  }

  /**
   * Updates the Y offset given a new offset.
   */
  updateOffsetY(offset?: number): void {
    // scroller is missing on empty table
    if (!this.scroller) {
      return;
    }

    if (this.scrollbarV && this.virtualization && offset) {
      // First get the row Index that we need to move to.
      const rowIndex = this.pageSize * offset;
      offset = this.rowHeightsCache().query(rowIndex - 1);
    } else if (this.scrollbarV && !this.virtualization) {
      offset = 0;
    }

    this.scroller.setOffset(offset || 0);
  }

  /**
   * Body was scrolled, this is mainly useful for
   * when a user is server-side pagination via virtual scroll.
   */
  onBodyScroll(event: any): void {
    const scrollYPos: number = event.scrollYPos;
    const scrollXPos: number = event.scrollXPos;

    // if scroll change, trigger update
    // this is mainly used for header cell positions
    if (this.offsetY !== scrollYPos || this.offsetX !== scrollXPos) {
      this.scroll.emit({
        offsetY: scrollYPos,
        offsetX: scrollXPos
      });
    }

    this.offsetY = scrollYPos;
    this.offsetX = scrollXPos;

    this.updateIndexes();
    this.updatePage(event.direction);
    this.cd.detectChanges();
  }

  /**
   * Updates the page given a direction.
   */
  updatePage(direction: string): void {
    let offset = this.indexes().first / this.pageSize;
    const scrollInBetween = !Number.isInteger(offset);
    if (direction === 'up') {
      offset = Math.ceil(offset);
    } else if (direction === 'down') {
      offset = Math.floor(offset);
    }

    if (direction !== undefined && !isNaN(offset) && offset !== this._offsetEvent) {
      this._offsetEvent = offset;
      // if scroll was done by mouse drag make sure previous row and next row data is also fetched if its not fetched
      if (scrollInBetween && this.scrollbarV && this.virtualization && this.externalPaging) {
        const upRow = this.rows[this.indexes().first - 1];
        if (!upRow && direction === 'up') {
          this.page.emit(offset - 1);
        }

        const downRow = this.rows[this.indexes().first + this.pageSize];
        if (!downRow && direction === 'down') {
          this.page.emit(offset + 1);
        }
      }
      this.page.emit(offset);
    }
  }

  /**
   * Updates the rows in the view port
   */
  updateRows(): (RowOrGroup<TRow> | undefined)[] {
    const { first, last } = this.indexes();
    // if grouprowsby has been specified treat row paging
    // parameters as group paging parameters ie if limit 10 has been
    // specified treat it as 10 groups rather than 10 rows
    const rows = this.groupedRows
      ? this.groupedRows.slice(first, Math.min(last, this.groupedRows.length))
      : this.rows.slice(first, Math.min(last, this.rowCount));

    rows.length = last - first;
    return rows;
  }

  /**
   * Get the row height
   */
  getRowHeight(row: RowOrGroup<TRow>): number {
    // if its a function return it
    if (typeof this.rowHeight === 'function') {
      return this.rowHeight(row);
    }

    return this.rowHeight as number;
  }

  /**
   * @param group the group with all rows
   */
  getGroupHeight(group: Group<TRow>): number {
    let rowHeight = 0;

    if (group.value) {
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let index = 0; index < group.value.length; index++) {
        rowHeight += this.getRowAndDetailHeight(group.value[index]);
      }
    }

    return rowHeight;
  }

  /**
   * Calculate row height based on the expanded state of the row.
   */
  getRowAndDetailHeight(row: TRow): number {
    let rowHeight = this.getRowHeight(row);
    const expanded = this.getRowExpanded(row);

    // Adding detail row height if its expanded.
    if (expanded) {
      rowHeight += this.getDetailRowHeight(row);
    }

    return rowHeight;
  }

  /**
   * Get the height of the detail row.
   */
  getDetailRowHeight = (row?: TRow, index?: number): number => {
    if (!this.rowDetail) {
      return 0;
    }
    const rowHeight = this.rowDetail.rowHeight;
    return typeof rowHeight === 'function' ? rowHeight(row, index) : (rowHeight as number);
  };

  getGroupHeaderRowHeight = (row?: any, index?: any): number => {
    if (!this.groupHeader) {
      return 0;
    }
    const rowHeight =
      this.groupHeader?.rowHeight === 0 ? this.rowHeight : this.groupHeader?.rowHeight;
    return typeof rowHeight === 'function' ? rowHeight(row, index) : (rowHeight as number);
  };

  /**
   * Calculates the offset of the rendered rows.
   * As virtual rows are not shown, we have to move all rendered rows
   * by the total size of previous non-rendered rows.
   * If each row has a size of 10px and the first 10 rows are not rendered due to scroll,
   * then we have a renderOffset of 100px.
   */
  renderOffset = computed(() => {
    if (this.scrollbarV && this.virtualization) {
      return `translateY(${this.rowHeightsCache().query(this.indexes().first - 1)}px)`;
    } else {
      return '';
    }
  });

  /**
   * Updates the index of the rows in the viewport
   */
  updateIndexes(): void {
    let first = 0;
    let last = 0;

    if (this.scrollbarV) {
      if (this.virtualization) {
        // Calculation of the first and last indexes will be based on where the
        // scrollY position would be at.  The last index would be the one
        // that shows up inside the view port the last.
        const height = parseInt(this._bodyHeight, 10);
        first = this.rowHeightsCache().getRowIndex(this.offsetY);
        last = this.rowHeightsCache().getRowIndex(height + this.offsetY) + 1;
      } else {
        // If virtual rows are not needed
        // We render all in one go
        first = 0;
        last = this.rowCount;
      }
    } else {
      // The server is handling paging and will pass an array that begins with the
      // element at a specified offset.  first should always be 0 with external paging.
      if (!this.externalPaging) {
        first = Math.max(this.offset * this.pageSize, 0);
      }
      last = Math.min(first + this.pageSize, this.rowCount);
    }

    this.indexes.set({ first, last });
  }

  /**
   * Refreshes the full Row Height cache.  Should be used
   * when the entire row array state has changed.
   */
  refreshRowHeightCache(): void {
    if (!this.scrollbarV || (this.scrollbarV && !this.virtualization)) {
      return;
    }

    // clear the previous row height cache if already present.
    // this is useful during sorts, filters where the state of the
    // rows array is changed.
    this.rowHeightsCache().clearCache();

    // Initialize the tree only if there are rows inside the tree.
    if (this.rows.length) {
      const rowExpansions = new Set<TRow>();
      if (this.rowDetail) {
        for (const row of this.rows) {
          if (row && this.getRowExpanded(row)) {
            rowExpansions.add(row);
          }
        }
      }

      this.rowHeightsCache().initCache({
        rows: this.rows,
        rowHeight: this.rowHeight,
        detailRowHeight: this.getDetailRowHeight,
        externalVirtual: this.scrollbarV && this.externalPaging,
        indexOffset: this.indexes().first,
        rowCount: this.rowCount,
        rowExpansions
      });
      this.rowHeightsCache.set(Object.create(this.rowHeightsCache()));
    }
  }

  /**
   * Toggle the Expansion of the row i.e. if the row is expanded then it will
   * collapse and vice versa.   Note that the expanded status is stored as
   * a part of the row object itself as we have to preserve the expanded row
   * status in case of sorting and filtering of the row set.
   */
  toggleRowExpansion(row: TRow): void {
    const rowExpandedIdx = this.getRowExpandedIdx(row, this.rowExpansions);
    const expanded = rowExpandedIdx > -1;

    // Update the toggled row and update thive nevere heights in the cache.
    if (expanded) {
      this.rowExpansions.splice(rowExpandedIdx, 1);
    } else {
      this.rowExpansions.push(row);
    }

    // If the detailRowHeight is auto --> only in case of non-virtualized scroll
    if (this.scrollbarV && this.virtualization) {
      this.refreshRowHeightCache();
    }
  }

  /**
   * Expand/Collapse all the rows no matter what their state is.
   */
  toggleAllRows(expanded: boolean): void {
    // clear prev expansions
    this.rowExpansions = [];

    const rows = this.groupedRows ?? this.rows;
    if (expanded) {
      for (const row of rows) {
        this.rowExpansions.push(row);
      }
    }

    if (this.scrollbarV) {
      // Refresh the full row heights cache since every row was affected.
      this.recalcLayout();
    }
  }

  /**
   * Recalculates the table
   */
  recalcLayout(): void {
    this.refreshRowHeightCache();
    this.updateIndexes();
  }

  /**
   * Returns if the row was expanded and set default row expansion when row expansion is empty
   */
  getRowExpanded(row: RowOrGroup<TRow>): boolean {
    if (this.rowExpansions.length === 0 && this.groupExpansionDefault) {
      for (const group of this.groupedRows!) {
        this.rowExpansions.push(group);
      }
    }

    return this.getRowExpandedIdx(row, this.rowExpansions) > -1;
  }

  getRowExpandedIdx(row: RowOrGroup<TRow>, expanded: RowOrGroup<TRow>[]): number {
    if (!expanded || !expanded.length) {
      return -1;
    }

    const rowId = this.rowIdentity(row);
    return expanded.findIndex(r => {
      const id = this.rowIdentity(r);
      return id === rowId;
    });
  }

  onTreeAction(row: TRow) {
    this.treeAction.emit({ row });
  }

  dragOver(event: DragEvent, dropRow: RowOrGroup<TRow>) {
    event.preventDefault();
    this.rowDragEvents.emit({
      event,
      srcElement: this._draggedRowElement!,
      eventType: 'dragover',
      dragRow: this._draggedRow,
      dropRow
    });
  }

  drag(event: DragEvent, dragRow: RowOrGroup<TRow>, rowComponent: DataTableBodyRowComponent<TRow>) {
    this._draggedRow = dragRow;
    this._draggedRowElement = rowComponent._element;
    this.rowDragEvents.emit({
      event,
      srcElement: this._draggedRowElement,
      eventType: 'dragstart',
      dragRow
    });
  }

  drop(event: DragEvent, dropRow: RowOrGroup<TRow>, rowComponent: DataTableBodyRowComponent<TRow>) {
    event.preventDefault();
    this.rowDragEvents.emit({
      event,
      srcElement: this._draggedRowElement!,
      targetElement: rowComponent._element,
      eventType: 'drop',
      dragRow: this._draggedRow,
      dropRow
    });
  }

  dragEnter(
    event: DragEvent,
    dropRow: RowOrGroup<TRow>,
    rowComponent: DataTableBodyRowComponent<TRow>
  ) {
    event.preventDefault();
    this.rowDragEvents.emit({
      event,
      srcElement: this._draggedRowElement!,
      targetElement: rowComponent._element,
      eventType: 'dragenter',
      dragRow: this._draggedRow,
      dropRow
    });
  }

  dragLeave(
    event: DragEvent,
    dropRow: RowOrGroup<TRow>,
    rowComponent: DataTableBodyRowComponent<TRow>
  ) {
    event.preventDefault();
    this.rowDragEvents.emit({
      event,
      srcElement: this._draggedRowElement!,
      targetElement: rowComponent._element,
      eventType: 'dragleave',
      dragRow: this._draggedRow,
      dropRow
    });
  }

  dragEnd(event: DragEvent, dragRow: RowOrGroup<TRow>) {
    event.preventDefault();
    this.rowDragEvents.emit({
      event,
      srcElement: this._draggedRowElement!,
      eventType: 'dragend',
      dragRow
    });
    this._draggedRow = undefined;
    this._draggedRowElement = undefined;
  }

  updateColumnGroupWidths() {
    const colsByPin = columnsByPin(this._columns);
    this.columnGroupWidths = columnGroupWidths(colsByPin, this._columns);
  }

  prevIndex?: number;

  selectRow(event: Event, index: number, row: TRow): void {
    if (!this.selectEnabled) {
      return;
    }

    const chkbox = this.selectionType === SelectionType.checkbox;
    const multi = this.selectionType === SelectionType.multi;
    const multiClick = this.selectionType === SelectionType.multiClick;
    let selected: TRow[] = [];

    // TODO: this code needs cleanup. Casting it to KeyboardEvent is not correct as it could also be other types.
    if (multi || chkbox || multiClick) {
      if ((event as KeyboardEvent).shiftKey) {
        selected = selectRowsBetween([], this.rows, index, this.prevIndex!);
      } else if (
        (event as KeyboardEvent).key === 'a' &&
        ((event as KeyboardEvent).ctrlKey || (event as KeyboardEvent).metaKey)
      ) {
        // select all rows except dummy rows which are added for ghostloader in case of virtual scroll
        selected = this.rows.filter(rowItem => !!rowItem);
      } else if (
        (event as KeyboardEvent).ctrlKey ||
        (event as KeyboardEvent).metaKey ||
        multiClick ||
        chkbox
      ) {
        selected = selectRows([...this.selected], row, this.getRowSelectedIdx.bind(this));
      } else {
        selected = selectRows([], row, this.getRowSelectedIdx.bind(this));
      }
    } else {
      selected = selectRows([], row, this.getRowSelectedIdx.bind(this));
    }

    if (typeof this.selectCheck === 'function') {
      selected = selected.filter(this.selectCheck.bind(this));
    }

    if (typeof this.disableRowCheck === 'function') {
      selected = selected.filter(rowData => !this.disableRowCheck!(rowData));
    }

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);

    this.prevIndex = index;

    this.select.emit({
      selected
    });
  }

  onActivate(model: ActivateEvent<TRow>, index: number): void {
    const { type, event, row } = model;
    const chkbox = this.selectionType === SelectionType.checkbox;
    const select =
      (!chkbox && (type === 'click' || type === 'dblclick')) || (chkbox && type === 'checkbox');

    if (select) {
      this.selectRow(event, index, row);
    } else if (type === 'keydown') {
      if ((event as KeyboardEvent).key === Keys.return) {
        this.selectRow(event, index, row);
      } else if (
        (event as KeyboardEvent).key === 'a' &&
        ((event as KeyboardEvent).ctrlKey || (event as KeyboardEvent).metaKey)
      ) {
        this.selectRow(event, 0, row); // The row property is ignored in this case. So we can pass anything.
      } else {
        this.onKeyboardFocus(model);
      }
    }
    this.activate.emit(model);
  }

  onKeyboardFocus(model: ActivateEvent<TRow>): void {
    const { key } = model.event as KeyboardEvent;
    const shouldFocus =
      key === Keys.up || key === Keys.down || key === Keys.right || key === Keys.left;

    if (shouldFocus) {
      const isCellSelection = this.selectionType === SelectionType.cell;
      if (typeof this.disableRowCheck === 'function') {
        const isRowDisabled = this.disableRowCheck(model.row);
        if (isRowDisabled) {
          return;
        }
      }
      if (!model.cellElement || !isCellSelection) {
        this.focusRow(model.rowElement, key);
      } else if (isCellSelection && model.cellIndex !== undefined) {
        this.focusCell(model.cellElement, model.rowElement, key, model.cellIndex);
      }
    }
  }

  focusRow(rowElement: HTMLElement, key: Keys): void {
    const nextRowElement = this.getPrevNextRow(rowElement, key);
    if (nextRowElement) {
      nextRowElement.focus();
    }
  }

  getPrevNextRow(rowElement: HTMLElement, key: Keys): any {
    const parentElement = rowElement.parentElement;

    if (parentElement) {
      let focusElement: Element | null = null;
      if (key === Keys.up) {
        focusElement = parentElement.previousElementSibling;
      } else if (key === Keys.down) {
        focusElement = parentElement.nextElementSibling;
      }

      if (focusElement && focusElement.children.length) {
        return focusElement.children[0];
      }
    }
  }

  focusCell(cellElement: HTMLElement, rowElement: HTMLElement, key: Keys, cellIndex: number): void {
    let nextCellElement: Element | null = null;

    if (key === Keys.left) {
      nextCellElement = cellElement.previousElementSibling;
    } else if (key === Keys.right) {
      nextCellElement = cellElement.nextElementSibling;
    } else if (key === Keys.up || key === Keys.down) {
      const nextRowElement = this.getPrevNextRow(rowElement, key);
      if (nextRowElement) {
        const children = nextRowElement.getElementsByClassName('datatable-body-cell');
        if (children.length) {
          nextCellElement = children[cellIndex];
        }
      }
    }

    if (
      nextCellElement &&
      'focus' in nextCellElement &&
      typeof nextCellElement.focus === 'function'
    ) {
      nextCellElement.focus();
    }
  }

  getRowSelected(row: TRow): boolean {
    return this.getRowSelectedIdx(row, this.selected) > -1;
  }

  getRowSelectedIdx(row: TRow, selected: any[]): number {
    if (!selected || !selected.length) {
      return -1;
    }

    const rowId = this.rowIdentity(row);
    return selected.findIndex(r => {
      const id = this.rowIdentity(r);
      return id === rowId;
    });
  }

  protected isGroup(row: RowOrGroup<TRow>[]): row is Group<TRow>[];
  protected isGroup(row: RowOrGroup<TRow>): row is Group<TRow>;

  protected isGroup(row: RowOrGroup<TRow> | RowOrGroup<TRow>[]): boolean {
    return !!this.groupedRows;
  }

  protected isRow(row: RowOrGroup<TRow> | undefined): row is TRow {
    return !this.groupedRows;
  }
}
