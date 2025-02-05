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
import { NgStyle } from '@angular/common';
import { TableColumn } from '../../types/table-column.type';
import { DatatableGroupHeaderDirective } from './body-group-header.directive';
import { DatatableRowDetailDirective } from '../row-detail/row-detail.directive';
import { DataTableBodyRowComponent } from './body-row.component';
import { ColumnGroupWidth } from '../../types/internal.types';
import {
  ActivateEvent,
  DragEventData,
  Group,
  RowOrGroup,
  ScrollEvent,
  SelectionType,
  TreeStatus
} from '../../types/public.types';
import { DraggableDirective } from '../../directives/draggable.directive';
import { DatatableRowDefInternalDirective } from './body-row-def.component';
import { DataTableRowWrapperComponent } from './body-row-wrapper.component';
import { DataTableSummaryRowComponent } from './summary/summary-row.component';
import { DataTableSelectionComponent } from './selection.component';
import { DataTableGhostLoaderComponent } from './ghost-loader/ghost-loader.component';

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
    <datatable-selection
      #selector
      [selected]="selected"
      [rows]="rows"
      [selectCheck]="selectCheck"
      [disableCheck]="disableRowCheck"
      [selectEnabled]="selectEnabled"
      [selectionType]="selectionType"
      [rowIdentity]="rowIdentity"
      (select)="select.emit($event)"
      (activate)="activate.emit($event)"
    >
      @if (rows?.length) {
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
              [offsetX]="offsetX"
              [innerWidth]="innerWidth"
              [rows]="rows"
              [columns]="columns"
            >
            </datatable-summary-row>
          }
          @for (group of rowsToRender(); track rowTrackingFn(i, group); let i = $index) {
            <datatable-row-wrapper
              #rowWrapper
              [attr.hidden]="
                ghostLoadingIndicator && (!rowCount || !virtualization || !scrollbarV) ? true : null
              "
              [groupedRows]="groupedRows"
              [innerWidth]="innerWidth"
              [ngStyle]="rowsStyles()[i]"
              [rowDetail]="rowDetail"
              [groupHeader]="groupHeader"
              [offsetX]="offsetX"
              [detailRowHeight]="getDetailRowHeight(group && group[i], i)"
              [groupHeaderRowHeight]="getGroupHeaderRowHeight(group && group[i], i)"
              [row]="group"
              [disableCheck]="disableRowCheck"
              [expanded]="getRowExpanded(group)"
              [rowIndex]="getRowIndex(group && group[i])"
              [selected]="selected"
              (rowContextmenu)="rowContextmenu.emit($event)"
            >
              @if (rowDefTemplate) {
                <ng-container
                  *rowDefInternal="{
                    template: rowDefTemplate,
                    rowTemplate: bodyRow,
                    row: group,
                    index: i
                  }"
                />
              } @else {
                @if (isRow(group)) {
                  <datatable-body-row
                    role="row"
                    tabindex="-1"
                    #rowElement
                    [disable$]="rowWrapper.disable$"
                    [isSelected]="selector.getRowSelected(group)"
                    [innerWidth]="innerWidth"
                    [offsetX]="offsetX"
                    [columns]="columns"
                    [rowHeight]="getRowHeight(group)"
                    [row]="group"
                    [rowIndex]="getRowIndex(group)"
                    [expanded]="getRowExpanded(group)"
                    [rowClass]="rowClass"
                    [displayCheck]="displayCheck"
                    [treeStatus]="group?.treeStatus"
                    [ghostLoadingIndicator]="ghostLoadingIndicator"
                    [draggable]="rowDraggable"
                    [verticalScrollVisible]="verticalScrollVisible"
                    (treeAction)="onTreeAction(group)"
                    (activate)="selector.onActivate($event, indexes().first + i)"
                    (drop)="drop($event, group, rowElement)"
                    (dragover)="dragOver($event, group)"
                    (dragenter)="dragEnter($event, group, rowElement)"
                    (dragleave)="dragLeave($event, group, rowElement)"
                    (dragstart)="drag($event, group, rowElement)"
                    (dragend)="dragEnd($event, group)"
                  >
                  </datatable-body-row>
                }
              }

              <ng-template #bodyRow>
                @if (isRow(group)) {
                  <datatable-body-row
                    role="row"
                    tabindex="-1"
                    #rowElement
                    [disable$]="rowWrapper.disable$"
                    [isSelected]="selector.getRowSelected(group)"
                    [innerWidth]="innerWidth"
                    [offsetX]="offsetX"
                    [columns]="columns"
                    [rowHeight]="getRowHeight(group)"
                    [row]="group"
                    [rowIndex]="getRowIndex(group)"
                    [expanded]="getRowExpanded(group)"
                    [rowClass]="rowClass"
                    [displayCheck]="displayCheck"
                    [treeStatus]="group?.treeStatus"
                    [ghostLoadingIndicator]="ghostLoadingIndicator"
                    [draggable]="rowDraggable"
                    [verticalScrollVisible]="verticalScrollVisible"
                    (treeAction)="onTreeAction(group)"
                    (activate)="selector.onActivate($event, indexes().first + i)"
                    (drop)="drop($event, group, rowElement)"
                    (dragover)="dragOver($event, group)"
                    (dragenter)="dragEnter($event, group, rowElement)"
                    (dragleave)="dragLeave($event, group, rowElement)"
                    (dragstart)="drag($event, group, rowElement)"
                    (dragend)="dragEnd($event, group)"
                  >
                  </datatable-body-row>
                }
              </ng-template>

              @if (isGroup(group)) {
                <!-- The row typecast is due to angular compiler acting weird. It is obvious that it is of type TRow, but the compiler does not understand. -->
                @for (row of group.value; track rowTrackingFn(i, row); let i = $index) {
                  <datatable-body-row
                    role="row"
                    [disable$]="rowWrapper.disable$"
                    tabindex="-1"
                    #rowElement
                    [isSelected]="selector.getRowSelected(row)"
                    [innerWidth]="innerWidth"
                    [offsetX]="offsetX"
                    [columns]="columns"
                    [rowHeight]="getRowHeight(row)"
                    [row]="row"
                    [group]="group.value"
                    [rowIndex]="getRowIndex(row)"
                    [expanded]="getRowExpanded(row)"
                    [rowClass]="rowClass"
                    [ghostLoadingIndicator]="ghostLoadingIndicator"
                    [draggable]="rowDraggable"
                    [verticalScrollVisible]="verticalScrollVisible"
                    (activate)="selector.onActivate($event, i)"
                    (drop)="drop($event, row, rowElement)"
                    (dragover)="dragOver($event, row)"
                    (dragenter)="dragEnter($event, row, rowElement)"
                    (dragleave)="dragLeave($event, row, rowElement)"
                    (dragstart)="drag($event, row, rowElement)"
                    (dragend)="dragEnd($event, row)"
                  >
                  </datatable-body-row>
                }
              }
            </datatable-row-wrapper>
          }
          @if (summaryRow && summaryPosition === 'bottom') {
            <datatable-summary-row
              role="row"
              [ngStyle]="bottomSummaryRowsStyles()"
              [rowHeight]="summaryHeight"
              [offsetX]="offsetX"
              [innerWidth]="innerWidth"
              [rows]="rows"
              [columns]="columns"
            >
            </datatable-summary-row>
          }
        </datatable-scroller>
      }
      @if (!rows?.length && !loadingIndicator && !ghostLoadingIndicator) {
        <datatable-scroller
          [scrollbarV]="scrollbarV"
          [scrollbarH]="scrollbarH"
          [scrollHeight]="scrollHeight()"
          [style.width]="scrollbarH ? columnGroupWidths?.total + 'px' : '100%'"
          (scroll)="onBodyScroll($event)"
        >
          <ng-content select="[empty-content]"></ng-content
        ></datatable-scroller>
      }
    </datatable-selection>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'datatable-body'
  },
  imports: [
    DataTableGhostLoaderComponent,
    DataTableSelectionComponent,
    ScrollerComponent,
    DataTableSummaryRowComponent,
    DataTableRowWrapperComponent,
    NgStyle,
    DatatableRowDefInternalDirective,
    DataTableBodyRowComponent,
    DraggableDirective
  ]
})
export class DataTableBodyComponent<TRow extends { treeStatus?: TreeStatus } = any>
  implements OnInit, OnDestroy
{
  cd = inject(ChangeDetectorRef);

  @Input() rowDefTemplate?: TemplateRef<any>;
  @Input() scrollbarV: boolean;
  @Input() scrollbarH: boolean;
  @Input() loadingIndicator: boolean;
  @Input() ghostLoadingIndicator: boolean;
  @Input() externalPaging: boolean;
  @Input() rowHeight: number | 'auto' | ((row?: any) => number);
  @Input() offsetX: number;
  @Input() selectionType: SelectionType;
  @Input() selected: any[] = [];
  @Input() rowIdentity: any;
  @Input() rowDetail: DatatableRowDetailDirective;
  @Input() groupHeader: DatatableGroupHeaderDirective;
  @Input() selectCheck: (value: TRow, index: number, array: TRow[]) => boolean;
  @Input() displayCheck: (row: TRow, column: TableColumn, value?: any) => boolean;
  @Input() trackByProp: string;
  @Input() rowClass: (row: RowOrGroup<TRow>) => string | Record<string, boolean>;
  @Input() groupedRows: Group<TRow>[];
  @Input() groupExpansionDefault: boolean;
  @Input() innerWidth: number;
  @Input() groupRowsBy: keyof TRow;
  @Input() virtualization: boolean;
  @Input() summaryRow: boolean;
  @Input() summaryPosition: string;
  @Input() summaryHeight: number;
  @Input() rowDraggable: boolean;
  @Input() rowDragEvents: EventEmitter<DragEventData>;
  @Input() disableRowCheck: (row: TRow) => boolean;

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

  @Input() set rows(val: TRow[]) {
    if (val !== this._rows) {
      this._rows = val;
      this.recalcLayout();
    }
  }

  get rows(): TRow[] {
    return this._rows;
  }

  @Input() set columns(val: TableColumn[]) {
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
        if (!isNaN(this._offset) && this.ghostLoadingIndicator) {
          this.rows = [];
        }
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

  @Output() scroll: EventEmitter<ScrollEvent> = new EventEmitter();
  @Output() page: EventEmitter<number> = new EventEmitter();
  @Output() activate: EventEmitter<ActivateEvent<TRow>> = new EventEmitter();
  @Output() select: EventEmitter<{ selected: TRow[] }> = new EventEmitter();
  @Output() detailToggle: EventEmitter<any> = new EventEmitter();
  @Output() rowContextmenu = new EventEmitter<{ event: MouseEvent; row: RowOrGroup<TRow> }>(false);
  @Output() treeAction: EventEmitter<{ row: TRow }> = new EventEmitter();

  @ViewChild(ScrollerComponent) scroller: ScrollerComponent;

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
  columnGroupWidths: ColumnGroupWidth;
  rowTrackingFn: TrackByFunction<RowOrGroup<TRow>>;
  listener: any;
  rowIndexes = new WeakMap<any, any>();
  rowExpansions: any[] = [];

  _rows: TRow[];
  _bodyHeight: string;
  _columns: TableColumn[];
  _rowCount: number;
  _offset: number;
  _pageSize: number;
  _offsetEvent = -1;

  private _draggedRow: RowOrGroup<TRow>;
  private _draggedRowElement: HTMLElement;

  /**
   * Creates an instance of DataTableBodyComponent.
   */
  constructor() {
    // declare fn here so we can get access to the `this` property
    this.rowTrackingFn = (index, row) => {
      if (this.ghostLoadingIndicator) {
        return index;
      }
      if (this.trackByProp) {
        return row[this.trackByProp];
      } else {
        const idx = this.getRowIndex(row);
        return idx;
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
  updateRows(): RowOrGroup<TRow>[] {
    const { first, last } = this.indexes();
    let rowIndex = first;
    let idx = 0;
    const temp: RowOrGroup<TRow>[] = [];

    // if grouprowsby has been specified treat row paging
    // parameters as group paging parameters ie if limit 10 has been
    // specified treat it as 10 groups rather than 10 rows
    if (this.groupedRows) {
      while (rowIndex < last && rowIndex < this.groupedRows.length) {
        // Add the groups into this page
        const group = this.groupedRows[rowIndex];
        this.rowIndexes.set(group, rowIndex);

        if (group.value) {
          // add indexes for each group item
          group.value.forEach((g: any, i: number) => {
            const _idx = `${rowIndex}-${i}`;
            this.rowIndexes.set(g, _idx);
          });
        }
        temp[idx] = group;
        idx++;

        // Group index in this context
        rowIndex++;
      }
    } else {
      while (rowIndex < last && rowIndex < this.rowCount) {
        const row = this.rows[rowIndex];

        if (row) {
          // add indexes for each row
          this.rowIndexes.set(row, rowIndex);
          temp[idx] = row;
        } else if (this.ghostLoadingIndicator && this.virtualization) {
          temp[idx] = undefined;
        }

        idx++;
        rowIndex++;
      }
    }
    return temp;
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
   * @returns the CSS3 style to be applied
   */
  rowsStyles = computed(() => {
    const rowsStyles: NgStyle['ngStyle'][] = [];
    this.rowsToRender().forEach((rows, index) => {
      const styles: NgStyle['ngStyle'] = {};

      // only add styles for the group if there is a group
      if (this.groupedRows) {
        styles.width = this.columnGroupWidths.total;
      }

      if (this.scrollbarV && this.virtualization) {
        let idx = 0;

        if (Array.isArray(rows)) {
          // Get the latest row rowindex in a group
          const row = rows[rows.length - 1];
          idx = row ? this.getRowIndex(row) : 0;
        } else {
          if (rows) {
            idx = this.getRowIndex(rows);
          } else {
            // When ghost cells are enabled use index to get the position of them
            idx = this.indexes().first + index;
          }
        }

        // const pos = idx * rowHeight;
        // The position of this row would be the sum of all row heights
        // until the previous row position.
        styles.transform = `translateY(${this.rowHeightsCache().query(idx - 1)}px)`;
      }
      rowsStyles.push(styles);
    });
    return rowsStyles;
  });

  /**
   * Calculate bottom summary row offset for scrollbar mode.
   * For more information about cache and offset calculation
   * see description for `rowsStyles` signal
   *
   * @returns the CSS3 style to be applied
   */
  bottomSummaryRowsStyles = computed(() => {
    if (!this.scrollbarV || !this.rows || !this.rows.length || !this.rowsToRender()) {
      return null;
    }

    const pos = this.rowHeightsCache().query(this.rows.length - 1);
    return {
      transform: `translateY(${pos}px)`,
      position: 'absolute'
    };
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
    if (this.rows && this.rows.length) {
      const rowExpansions = new Set<TRow>();
      if (this.rowDetail) {
        for (const row of this.rows) {
          if (this.getRowExpanded(row)) {
            rowExpansions.add(row);
          }
        }
      }

      this.rowHeightsCache().initCache({
        rows: this.rows,
        rowHeight: this.rowHeight,
        detailRowHeight: this.getDetailRowHeight,
        externalVirtual: this.scrollbarV && this.externalPaging,
        rowCount: this.rowCount,
        rowIndexes: this.rowIndexes,
        rowExpansions
      });
      this.rowHeightsCache.set(Object.create(this.rowHeightsCache()));
    }
  }

  /**
   * Gets the index for the view port
   */
  getAdjustedViewPortIndex(): number {
    // Capture the row index of the first row that is visible on the viewport.
    // If the scroll bar is just below the row which is highlighted then make that as the
    // first index.
    const viewPortFirstRowIndex = this.indexes().first;

    if (this.scrollbarV && this.virtualization) {
      const offsetScroll = this.rowHeightsCache().query(viewPortFirstRowIndex - 1);
      return offsetScroll <= this.offsetY ? viewPortFirstRowIndex - 1 : viewPortFirstRowIndex;
    }

    return viewPortFirstRowIndex;
  }

  /**
   * Toggle the Expansion of the row i.e. if the row is expanded then it will
   * collapse and vice versa.   Note that the expanded status is stored as
   * a part of the row object itself as we have to preserve the expanded row
   * status in case of sorting and filtering of the row set.
   */
  toggleRowExpansion(row: TRow): void {
    // Capture the row index of the first row that is visible on the viewport.
    const viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
    const rowExpandedIdx = this.getRowExpandedIdx(row, this.rowExpansions);
    const expanded = rowExpandedIdx > -1;

    // If the detailRowHeight is auto --> only in case of non-virtualized scroll
    if (this.scrollbarV && this.virtualization) {
      const detailRowHeight = this.getDetailRowHeight(row) * (expanded ? -1 : 1);
      // const idx = this.rowIndexes.get(row) || 0;
      const idx = this.getRowIndex(row);
      this.rowHeightsCache().update(idx, detailRowHeight);
    }

    // Update the toggled row and update thive nevere heights in the cache.
    if (expanded) {
      this.rowExpansions.splice(rowExpandedIdx, 1);
    } else {
      this.rowExpansions.push(row);
    }

    this.detailToggle.emit({
      rows: [row],
      currentIndex: viewPortFirstRowIndex
    });
  }

  /**
   * Expand/Collapse all the rows no matter what their state is.
   */
  toggleAllRows(expanded: boolean): void {
    // clear prev expansions
    this.rowExpansions = [];

    // Capture the row index of the first row that is visible on the viewport.
    const viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
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

    // Emit all rows that have been expanded.
    this.detailToggle.emit({
      rows: rows,
      currentIndex: viewPortFirstRowIndex
    });
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
      for (const group of this.groupedRows) {
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

  /**
   * Gets the row index given a row
   */
  getRowIndex(row: RowOrGroup<TRow>): number {
    return this.rowIndexes.get(row) || 0;
  }

  onTreeAction(row: TRow) {
    this.treeAction.emit({ row });
  }

  dragOver(event: DragEvent, dropRow: RowOrGroup<TRow>) {
    event.preventDefault();
    this.rowDragEvents.emit({
      event,
      srcElement: this._draggedRowElement,
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
      srcElement: this._draggedRowElement,
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
      srcElement: this._draggedRowElement,
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
      srcElement: this._draggedRowElement,
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
      srcElement: this._draggedRowElement,
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

  protected isGroup(row: RowOrGroup<TRow>[]): row is Group<TRow>[];
  protected isGroup(row: RowOrGroup<TRow>): row is Group<TRow>;

  protected isGroup(row: RowOrGroup<TRow> | RowOrGroup<TRow>[]): boolean {
    return !!this.groupedRows;
  }

  protected isRow(row: RowOrGroup<TRow>): row is TRow {
    return !this.groupedRows;
  }
}
