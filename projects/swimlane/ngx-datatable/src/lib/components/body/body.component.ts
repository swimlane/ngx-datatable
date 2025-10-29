import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  DestroyRef,
  effect,
  EventEmitter,
  inject,
  Input,
  input,
  model,
  OnChanges,
  OnInit,
  output,
  signal,
  SimpleChanges,
  TemplateRef,
  TrackByFunction,
  untracked,
  ViewChild
} from '@angular/core';

import { NgxDatatableConfig } from '../../ngx-datatable.config';
import { TableColumnInternal } from '../../types/internal.types';
import {
  ActivateEvent,
  DetailToggleEvents,
  DragEventData,
  Group,
  GroupToggleEvents,
  Row,
  RowOrGroup,
  ScrollEvent,
  SelectionType
} from '../../types/public.types';
import { columnGroupWidths, columnsByPin } from '../../utils/column';
import { ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT, ARROW_UP, ENTER } from '../../utils/keys';
import { RowHeightCache } from '../../utils/row-height-cache';
import { selectRows, selectRowsBetween } from '../../utils/selection';
import { DatatableRowDetailDirective } from '../row-detail/row-detail.directive';
import { DatatableGroupHeaderDirective } from './body-group-header.directive';
import { DataTableGroupWrapperComponent } from './body-group-wrapper.component';
import { DatatableRowDefInternalDirective } from './body-row-def.component';
import { DataTableRowWrapperComponent } from './body-row-wrapper.component';
import { DataTableBodyRowComponent } from './body-row.component';
import { DatatableBodyRowDirective } from './body-row.directive';
import { DataTableGhostLoaderComponent } from './ghost-loader/ghost-loader.component';
import { ScrollerComponent } from './scroller.component';
import { DataTableSummaryRowComponent } from './summary/summary-row.component';

@Component({
  selector: 'datatable-body',
  imports: [
    DataTableGhostLoaderComponent,
    ScrollerComponent,
    DataTableSummaryRowComponent,
    DataTableRowWrapperComponent,
    DatatableRowDefInternalDirective,
    DataTableBodyRowComponent,
    NgTemplateOutlet,
    DatatableBodyRowDirective,
    DataTableGroupWrapperComponent
  ],
  template: `
    @if (loadingIndicator()) {
      <div class="custom-loading-indicator-wrapper">
        <div class="custom-loading-content">
          <ng-content select="[loading-indicator]" />
        </div>
      </div>
    }
    @let scrollbarV = this.scrollbarV();
    @let columns = this.columns();
    @let columnGroupWidths = this.columnGroupWidths();
    @let bodyHeight = this._bodyHeight();
    @let rows = this.rows();
    @let rowCount = this.rowCount();
    @if (ghostLoadingIndicator() && (!rowCount || !virtualization() || !scrollbarV)) {
      <ghost-loader
        class="ghost-overlay"
        [columns]="columns"
        [pageSize]="pageSize()"
        [rowHeight]="rowHeight()"
        [ghostBodyHeight]="bodyHeight"
      />
    }
    @if (rows.length) {
      <datatable-scroller
        [scrollbarV]="scrollbarV"
        [scrollbarH]="scrollbarH()"
        [scrollHeight]="scrollHeight()"
        [scrollWidth]="columnGroupWidths?.total"
        [class.horizontal-overflow]="innerWidth() < (columnGroupWidths?.total ?? 0)"
        (scroll)="onBodyScroll($event)"
      >
        @if (summaryRow() && summaryPosition() === 'top') {
          <datatable-summary-row
            [rowHeight]="summaryHeight()"
            [innerWidth]="innerWidth()"
            [rows]="rows"
            [columns]="columns"
          />
        }
        <ng-template
          #bodyRow
          let-row="row"
          let-index="index"
          let-indexInGroup="indexInGroup"
          let-groupedRows="groupedRows"
          let-disabled="disabled"
          ngx-datatable-body-row
        >
          <datatable-row-wrapper
            [attr.hidden]="
              ghostLoadingIndicator() && (!rowCount || !virtualization() || !scrollbarV)
                ? true
                : null
            "
            [innerWidth]="innerWidth()"
            [rowDetail]="rowDetail()"
            [detailRowHeight]="getDetailRowHeight(row, index)"
            [row]="row"
            [disabled]="disabled"
            [expanded]="getRowExpanded(row)"
            [rowIndex]="indexes().first + index"
            [ariaGroupHeaderCheckboxMessage]="ariaGroupHeaderCheckboxMessage()"
            (rowContextmenu)="rowContextmenu.emit($event)"
          >
            <datatable-body-row
              #rowElement
              role="row"
              tabindex="-1"
              [disabled]="disabled"
              [isSelected]="getRowSelected(row)"
              [columns]="columns"
              [rowHeight]="getRowHeight(row)"
              [row]="row"
              [group]="groupedRows"
              [rowIndex]="{ index: index, indexInGroup: indexInGroup }"
              [expanded]="getRowExpanded(row)"
              [rowClass]="rowClass()"
              [displayCheck]="displayCheck()"
              [treeStatus]="row?.treeStatus"
              [draggable]="rowDraggable()"
              [ariaRowCheckboxMessage]="ariaRowCheckboxMessage()"
              [cssClasses]="cssClasses()"
              (treeAction)="onTreeAction(row)"
              (activate)="onActivate($event, index)"
              (drop)="drop($event, row, rowElement)"
              (dragover)="dragOver($event, row)"
              (dragenter)="dragEnter($event, row, rowElement)"
              (dragleave)="dragLeave($event, row, rowElement)"
              (dragstart)="drag($event, row, rowElement)"
              (dragend)="dragEnd($event, row)"
            />
          </datatable-row-wrapper>
        </ng-template>

        <div [style.transform]="renderOffset()">
          @for (group of rowsToRender(); track rowTrackingFn(i, group); let i = $index) {
            @if (!group && ghostLoadingIndicator()) {
              <ghost-loader cellMode [columns]="columns" [pageSize]="1" [rowHeight]="rowHeight()" />
            } @else if (group) {
              @let disableRowCheck = this.disableRowCheck();
              @let disabled = isRow(group) && disableRowCheck && disableRowCheck(group);
              @let rowDefTemplate = this.rowDefTemplate();
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
                  />
                }
              }

              @if (isGroup(group)) {
                <datatable-group-wrapper
                  [group]="group"
                  [attr.hidden]="
                    ghostLoadingIndicator() && (!rowCount || !virtualization() || !scrollbarV)
                      ? true
                      : null
                  "
                  [innerWidth]="innerWidth()"
                  [style.width]="groupedRows() ? columnGroupWidths.total : undefined"
                  [groupHeader]="groupHeader()"
                  [groupHeaderRowHeight]="getGroupHeaderRowHeight(group, i)"
                  [disabled]="disabled"
                  [expanded]="getGroupExpanded(group)"
                  [rowIndex]="indexes().first + i"
                  [selected]="selected()"
                  [ariaGroupHeaderCheckboxMessage]="ariaGroupHeaderCheckboxMessage()"
                  (groupSelectedChange)="groupSelectedChange($event, group)"
                >
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
                    />
                  }
                </datatable-group-wrapper>
              }
            }
          }
        </div>
      </datatable-scroller>
      @if (summaryRow() && summaryPosition() === 'bottom') {
        <datatable-summary-row
          role="row"
          [rowHeight]="summaryHeight()"
          [innerWidth]="innerWidth()"
          [rows]="rows"
          [columns]="columns"
        />
      }
    }
    @if (!rows?.length && !loadingIndicator() && !ghostLoadingIndicator()) {
      <datatable-scroller
        [scrollbarV]="scrollbarV"
        [scrollbarH]="scrollbarH()"
        [scrollHeight]="scrollHeight()"
        [style.width]="scrollbarH() ? columnGroupWidths?.total + 'px' : '100%'"
        (scroll)="onBodyScroll($event)"
      >
        <ng-content select="[empty-content]" />
      </datatable-scroller>
    }
  `,
  styleUrl: './body.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'datatable-body',
    '[style.height]': '_bodyHeight()',
    '[style.width]': '_bodyWidth()'
  }
})
export class DataTableBodyComponent<TRow extends Row = any> implements OnInit, OnChanges {
  cd = inject(ChangeDetectorRef);

  readonly rowDefTemplate = input<TemplateRef<any>>();
  readonly scrollbarV = input(false, { transform: booleanAttribute });
  readonly scrollbarH = input<boolean>();
  readonly loadingIndicator = input<boolean>();
  readonly ghostLoadingIndicator = input<boolean>();
  readonly externalPaging = input<boolean>();
  readonly rowHeight = input.required<number | 'auto' | ((row?: any) => number)>();
  readonly offsetX = model.required<number>();
  readonly selectionType = input<SelectionType>();
  readonly selected = model<TRow[]>([]);
  readonly rowIdentity = input.required<(x: RowOrGroup<TRow>) => unknown>();
  readonly rowDetail = input<DatatableRowDetailDirective>();
  readonly groupHeader = input<DatatableGroupHeaderDirective>();
  readonly selectCheck = input<(value: TRow, index: number, array: TRow[]) => boolean>();
  readonly displayCheck = input<(row: TRow, column: TableColumnInternal, value?: any) => boolean>();
  readonly trackByProp = input<string>();
  readonly rowClass = input<(row: TRow) => string | Record<string, boolean>>();
  readonly groupedRows = input<Group<TRow>[]>();
  // TODO: Find a better way to handle default expansion state with signal input
  @Input() groupExpansionDefault?: boolean;
  readonly innerWidth = input.required<number>();
  readonly groupRowsBy = input<keyof TRow>();
  readonly virtualization = input<boolean>();
  readonly summaryRow = input<boolean>();
  readonly summaryPosition = input.required<string>();
  readonly summaryHeight = input.required<number>();
  readonly rowDraggable = input<boolean>();
  readonly rowDragEvents = input.required<EventEmitter<DragEventData>>();
  readonly disableRowCheck = input<(row: TRow) => boolean | undefined>();
  readonly ariaGroupHeaderCheckboxMessage = input.required<string>();

  readonly pageSize = input.required<number>();

  readonly rows = input.required<(TRow | undefined)[]>();

  readonly columns = input.required<TableColumnInternal[]>();

  readonly offset = input<number>(0);

  readonly rowCount = input<number>(0);

  readonly bodyHeight = input<string | number>();
  readonly verticalScrollVisible = input(false);
  readonly ariaRowCheckboxMessage = input.required<string>();
  readonly cssClasses = input.required<Partial<Required<NgxDatatableConfig>['cssClasses']>>();

  readonly scroll = output<ScrollEvent>();
  readonly page = output<number>();
  readonly activate = output<ActivateEvent<TRow>>();
  readonly rowContextmenu = output<{
    event: MouseEvent;
    row: RowOrGroup<TRow>;
  }>();
  readonly treeAction = output<{ row: TRow }>();

  @ViewChild(ScrollerComponent) scroller!: ScrollerComponent;

  /**
   * Returns if selection is enabled.
   */
  get selectEnabled(): boolean {
    return !!this.selectionType();
  }

  /**
   * Property that would calculate the height of scroll bar
   * based on the row heights cache for virtual scroll and virtualization. Other scenarios
   * calculate scroll height automatically (as height will be undefined).
   */
  readonly scrollHeight = computed(() => {
    if (this.rowHeightsCache() && this.scrollbarV() && this.virtualization() && this.rowCount()) {
      return this.rowHeightsCache().query(this.rowCount() - 1);
    }
    // avoid TS7030: Not all code paths return a value.
    return undefined;
  });

  readonly rowsToRender = computed(() => {
    return this.updateRows();
  });
  readonly rowHeightsCache = computed(() => this.computeRowHeightsCache());
  readonly offsetY = signal(0);
  readonly indexes = computed(() => this.computeIndexes());
  readonly columnGroupWidths = computed(() => {
    const colsByPin = columnsByPin(this.columns());
    return columnGroupWidths(colsByPin, this.columns());
  });
  rowTrackingFn: TrackByFunction<RowOrGroup<TRow> | undefined>;
  destroyRef = inject(DestroyRef);
  readonly rowExpansions = signal<TRow[]>([]);
  readonly groupExpansions = signal<Group<TRow>[]>([]);

  _rows!: (TRow | undefined)[];
  readonly _bodyWidth = computed(() => {
    if (this.scrollbarH()) {
      return this.innerWidth() + 'px';
    } else {
      return '100%';
    }
  });
  readonly _bodyHeight = computed(() => {
    if (this.scrollbarV()) {
      return this.bodyHeight() + 'px';
    } else {
      return 'auto';
    }
  });
  _offsetEvent = -1;

  private _draggedRow?: RowOrGroup<TRow>;
  private _draggedRowElement?: HTMLElement;

  /**
   * Creates an instance of DataTableBodyComponent.
   */
  constructor() {
    // declare fn here so we can get access to the `this` property
    this.rowTrackingFn = (index, row) => {
      if (this.ghostLoadingIndicator()) {
        return index;
      }
      const trackByProp = this.trackByProp();
      if (trackByProp && row) {
        return (row as any)[trackByProp];
      } else if (row && this.isGroup(row)) {
        return row.key ?? index;
      } else {
        return row ?? index;
      }
    };
    effect(() => this.defaultGroupExpansionEffect());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.bodyHeight || changes.rows || changes.rowCount || changes.pageSize) {
      if (changes.pageSize) {
        this._offsetEvent = -1;
        this.updatePage('up');
        this.updatePage('down');
      }
    }
  }

  /**
   * Called after the constructor, initializing input properties
   */
  ngOnInit(): void {
    const rowDetail = this.rowDetail();
    if (rowDetail) {
      const listener = rowDetail.toggle.subscribe(event => this.rowToggleStateChange(event));
      this.destroyRef.onDestroy(() => listener.unsubscribe());
    }

    const groupHeader = this.groupHeader();
    if (groupHeader) {
      const listener = groupHeader.toggle.subscribe(event => {
        // Remove default expansion state once user starts manual toggle.
        this.groupExpansionDefault = false;
        this.groupToggleStateChange(event);
      });
      this.destroyRef.onDestroy(() => listener.unsubscribe());
    }
  }

  private defaultGroupExpansionEffect(): void {
    if (
      this.groupedRows() &&
      untracked(() => this.groupExpansions().length) === 0 &&
      this.groupExpansionDefault
    ) {
      this.groupExpansions.set([...(this.groupedRows() ?? [])]);
    }
  }

  private groupToggleStateChange({ type, value }: GroupToggleEvents<TRow>) {
    if (type === 'group') {
      this.toggleGroupExpansion(value);
    }
    if (type === 'all') {
      this.toggleAllGroups(value);
    }

    // Refresh rows after toggle
    this.cd.markForCheck();
  }

  private rowToggleStateChange({ type, value }: DetailToggleEvents<TRow>) {
    if (type === 'row') {
      this.toggleRowExpansion(value);
    }
    if (type === 'all') {
      this.toggleAllRows(value);
    }

    // Refresh rows after toggle
    this.cd.markForCheck();
  }

  /**
   * Updates the Y offset given a new offset.
   */
  updateOffsetY(offset?: number): void {
    // scroller is missing on empty table
    if (!this.scroller) {
      return;
    }

    const virtualization = this.virtualization();
    if (this.scrollbarV() && virtualization && offset) {
      // First get the row Index that we need to move to.
      const rowIndex = this.pageSize() * offset;
      offset = this.rowHeightsCache().query(rowIndex - 1);
    } else if (this.scrollbarV() && !virtualization) {
      offset = 0;
    }

    this.scroller.setOffset(offset ?? 0);
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
    if (this.offsetY() !== scrollYPos || this.offsetX() !== scrollXPos) {
      this.scroll.emit({
        offsetY: scrollYPos,
        offsetX: scrollXPos
      });
    }

    this.offsetY.set(scrollYPos);
    this.offsetX.set(scrollXPos);

    this.updatePage(event.direction);
    this.cd.detectChanges();
  }

  /**
   * Updates the page given a direction.
   */
  updatePage(direction: string): void {
    let offset = this.indexes().first / this.pageSize();
    const scrollInBetween = !Number.isInteger(offset);
    if (direction === 'up') {
      offset = Math.ceil(offset);
    } else if (direction === 'down') {
      offset = Math.floor(offset);
    }

    if (direction !== undefined && !isNaN(offset) && offset !== this._offsetEvent) {
      this._offsetEvent = offset;
      // if scroll was done by mouse drag make sure previous row and next row data is also fetched if its not fetched
      if (scrollInBetween && this.scrollbarV() && this.virtualization() && this.externalPaging()) {
        const upRow = this.rows()[this.indexes().first - 1];
        if (!upRow && direction === 'up') {
          this.page.emit(offset - 1);
        }

        const downRow = this.rows()[this.indexes().first + this.pageSize()];
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
    const groupedRows = this.groupedRows();
    const rows = groupedRows
      ? groupedRows.slice(first, Math.min(last, groupedRows.length))
      : this.rows().slice(first, Math.min(last, this.rowCount()));

    rows.length = last - first;
    return rows;
  }

  /**
   * Get the row height
   */
  getRowHeight(row: RowOrGroup<TRow>): number {
    // if its a function return it
    const rowHeight = this.rowHeight();
    if (typeof rowHeight === 'function') {
      return rowHeight(row);
    }

    return rowHeight as number;
  }

  /**
   * Get the height of the detail row.
   */
  getDetailRowHeight = (row?: TRow, index?: number): number => {
    const rowDetail = this.rowDetail();
    if (!rowDetail) {
      return 0;
    }
    const rowHeight = rowDetail.rowHeight();
    return typeof rowHeight === 'function' ? rowHeight(row, index) : (rowHeight as number);
  };

  getGroupHeaderRowHeight = (row?: any, index?: any): number => {
    const groupHeader = this.groupHeader();
    if (!groupHeader) {
      return 0;
    }
    const rowHeight = groupHeader?.rowHeight === 0 ? this.rowHeight() : groupHeader?.rowHeight;
    return typeof rowHeight === 'function' ? rowHeight(row, index) : (rowHeight as number);
  };

  /**
   * Calculates the offset of the rendered rows.
   * As virtual rows are not shown, we have to move all rendered rows
   * by the total size of previous non-rendered rows.
   * If each row has a size of 10px and the first 10 rows are not rendered due to scroll,
   * then we have a renderOffset of 100px.
   */
  readonly renderOffset = computed(() => {
    if (this.scrollbarV() && this.virtualization()) {
      return `translateY(${this.rowHeightsCache().query(this.indexes().first - 1)}px)`;
    } else {
      return '';
    }
  });

  /**
   * Updates the index of the rows in the viewport
   */
  computeIndexes(): { first: number; last: number } {
    let first = 0;
    let last = this.rowCount();

    if (this.scrollbarV()) {
      if (this.virtualization()) {
        // Calculation of the first and last indexes will be based on where the
        // scrollY position would be at.  The last index would be the one
        // that shows up inside the view port the last.
        const height = parseInt(this._bodyHeight(), 10);
        first = this.rowHeightsCache().getRowIndex(this.offsetY());
        last = this.rowHeightsCache().getRowIndex(height + this.offsetY()) + 1;
      }
    } else {
      // The server is handling paging and will pass an array that begins with the
      // element at a specified offset.  first should always be 0 with external paging.
      if (!this.externalPaging()) {
        first = Math.max(this.offset() * this.pageSize(), 0);
      }
      last = Math.min(first + this.pageSize(), this.rowCount());
    }

    return { first, last };
  }

  /**
   * Refreshes the full Row Height cache.  Should be used
   * when the entire row array state has changed.
   */
  computeRowHeightsCache(): RowHeightCache<TRow> {
    const cache = new RowHeightCache<TRow>();
    if (!this.scrollbarV() || (this.scrollbarV() && !this.virtualization())) {
      return cache;
    }

    // Initialize the tree only if there are rows inside the tree.
    if (this.rows().length) {
      cache.initCache({
        rows: this.rows() as TRow[], // TODO: RowHeightCache does not support grouping
        rowHeight: this.rowHeight(),
        detailRowHeight: this.getDetailRowHeight,
        externalVirtual: this.scrollbarV() && this.externalPaging(),
        indexOffset: this.externalPaging() ? this.offset() * this.pageSize() : 0,
        rowCount: this.rowCount(),
        rowExpansions: new Set<TRow>(this.rowDetail() ? this.rowExpansions() : [])
      });
    }
    return cache;
  }

  /**
   * Toggle the Expansion of the row i.e. if the row is expanded then it will
   * collapse and vice versa.   Note that the expanded status is stored as
   * a part of the row object itself as we have to preserve the expanded row
   * status in case of sorting and filtering of the row set.
   */
  toggleRowExpansion(row: TRow): void {
    const rowExpandedIdx = this.getExpandedIdx(row, this.rowExpansions());
    const expanded = rowExpandedIdx > -1;

    // Update the toggled row and update thive nevere heights in the cache.
    if (expanded) {
      this.rowExpansions.update(expansions => {
        expansions.splice(rowExpandedIdx, 1);
        return [...expansions];
      });
    } else {
      this.rowExpansions.update(expansions => [...expansions, row]);
    }
  }

  toggleGroupExpansion(row: Group<TRow>): void {
    const groupExpandedIdx = this.getExpandedIdx(row, this.groupExpansions());
    const expanded = groupExpandedIdx > -1;

    // Update the toggled row and update thive nevere heights in the cache.
    if (expanded) {
      this.groupExpansions.update(expansions => {
        expansions.splice(groupExpandedIdx, 1);
        return [...expansions];
      });
    } else {
      this.groupExpansions.update(expansions => [...expansions, row]);
    }
  }

  /**
   * Expand/Collapse all the rows no matter what their state is.
   */
  toggleAllRows(expanded: boolean): void {
    // TODO requires fixing. This still does not work with groups.
    this.rowExpansions.set(expanded ? [...(this.rows() as any)] : []);
  }

  /**
   * Expand/Collapse all the groups no matter what their state is.
   */
  toggleAllGroups(expanded: boolean): void {
    this.groupExpansions.set(expanded ? [...this.groupedRows()!] : []);
  }

  /**
   * Returns if the row was expanded and set default row expansion when row expansion is empty
   */
  getRowExpanded(row: TRow): boolean {
    return this.getExpandedIdx(row, this.rowExpansions()) > -1;
  }

  getGroupExpanded(group: Group<TRow>): boolean {
    return this.getExpandedIdx(group, this.groupExpansions()) > -1;
  }

  getExpandedIdx(row: RowOrGroup<TRow>, expanded: RowOrGroup<TRow>[]): number {
    if (!expanded?.length) {
      return -1;
    }

    const rowId = this.rowIdentity()(row);
    return expanded.findIndex(r => {
      const id = this.rowIdentity()(r);
      return id === rowId;
    });
  }

  onTreeAction(row: TRow) {
    this.treeAction.emit({ row });
  }

  dragOver(event: DragEvent, dropRow: RowOrGroup<TRow>) {
    event.preventDefault();
    this.rowDragEvents().emit({
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
    this.rowDragEvents().emit({
      event,
      srcElement: this._draggedRowElement,
      eventType: 'dragstart',
      dragRow
    });
  }

  drop(event: DragEvent, dropRow: RowOrGroup<TRow>, rowComponent: DataTableBodyRowComponent<TRow>) {
    event.preventDefault();
    this.rowDragEvents().emit({
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
    this.rowDragEvents().emit({
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
    this.rowDragEvents().emit({
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
    this.rowDragEvents().emit({
      event,
      srcElement: this._draggedRowElement!,
      eventType: 'dragend',
      dragRow
    });
    this._draggedRow = undefined;
    this._draggedRowElement = undefined;
  }

  prevIndex?: number;

  selectRow(event: Event, index: number, row: TRow): void {
    if (!this.selectEnabled) {
      return;
    }

    const chkbox = this.selectionType() === 'checkbox';
    const multi = this.selectionType() === 'multi';
    const multiClick = this.selectionType() === 'multiClick';
    let selected: TRow[] = [];

    // TODO: this code needs cleanup. Casting it to KeyboardEvent is not correct as it could also be other types.
    if (multi || chkbox || multiClick) {
      if ((event as KeyboardEvent).shiftKey) {
        selected = selectRowsBetween([], this.rows(), index, this.prevIndex!);
      } else if (
        (event as KeyboardEvent).key === 'a' &&
        ((event as KeyboardEvent).ctrlKey || (event as KeyboardEvent).metaKey)
      ) {
        // select all rows except dummy rows which are added for ghostloader in case of virtual scroll
        selected = this.rows().filter(rowItem => !!rowItem);
      } else if (
        (event as KeyboardEvent).ctrlKey ||
        (event as KeyboardEvent).metaKey ||
        multiClick ||
        chkbox
      ) {
        selected = selectRows([...this.selected()], row, this.getRowSelectedIdx.bind(this));
      } else {
        selected = selectRows([], row, this.getRowSelectedIdx.bind(this));
      }
    } else {
      selected = selectRows([], row, this.getRowSelectedIdx.bind(this));
    }

    const selectCheck = this.selectCheck();
    if (typeof selectCheck === 'function') {
      selected = selected.filter(selectCheck.bind(this));
    }

    if (typeof this.disableRowCheck() === 'function') {
      selected = selected.filter(rowData => !this.disableRowCheck()!(rowData));
    }

    this.selected.set(selected);
    this.prevIndex = index;
  }

  onActivate(modelObject: ActivateEvent<TRow>, index: number): void {
    const { type, event, row } = modelObject;
    const chkbox = this.selectionType() === 'checkbox';
    const select =
      (!chkbox && (type === 'click' || type === 'dblclick')) || (chkbox && type === 'checkbox');

    if (select) {
      this.selectRow(event, index, row);
    } else if (type === 'keydown') {
      if ((event as KeyboardEvent).key === ENTER) {
        this.selectRow(event, index, row);
      } else if (
        (event as KeyboardEvent).key === 'a' &&
        ((event as KeyboardEvent).ctrlKey || (event as KeyboardEvent).metaKey)
      ) {
        this.selectRow(event, 0, row); // The row property is ignored in this case. So we can pass anything.
      } else {
        this.onKeyboardFocus(modelObject);
      }
    }
    this.activate.emit(modelObject);
  }

  groupSelectedChange(selected: boolean, group: Group<TRow>): void {
    const selectedSet = new Set(this.selected());
    if (selected) {
      group.value.forEach(row => selectedSet.add(row));
    } else {
      group.value.forEach(row => selectedSet.delete(row));
    }
    this.selected.set(Array.from(selectedSet));
  }

  onKeyboardFocus(modelObject: ActivateEvent<TRow>): void {
    const { key } = modelObject.event as KeyboardEvent;
    const shouldFocus =
      key === ARROW_UP || key === ARROW_DOWN || key === ARROW_RIGHT || key === ARROW_LEFT;

    if (shouldFocus) {
      const isCellSelection = this.selectionType() === 'cell';
      const disableRowCheck = this.disableRowCheck();
      if (typeof disableRowCheck === 'function') {
        const isRowDisabled = disableRowCheck(modelObject.row);
        if (isRowDisabled) {
          return;
        }
      }
      if (!modelObject.cellElement || !isCellSelection) {
        this.focusRow(modelObject.rowElement, key);
      } else if (isCellSelection && modelObject.cellIndex !== undefined) {
        this.focusCell(modelObject.cellElement, modelObject.rowElement, key, modelObject.cellIndex);
      }
    }
  }

  focusRow(rowElement: HTMLElement, key: string): void {
    const nextRowElement = this.getPrevNextRow(rowElement, key);
    if (nextRowElement) {
      nextRowElement.focus();
    }
  }

  getPrevNextRow(rowElement: HTMLElement, key: string): any {
    const parentElement = rowElement.parentElement;

    if (parentElement) {
      let focusElement: Element | null = null;
      if (key === ARROW_UP) {
        focusElement = parentElement.previousElementSibling;
      } else if (key === ARROW_DOWN) {
        focusElement = parentElement.nextElementSibling;
      }

      if (focusElement?.children.length) {
        return focusElement.children[0];
      }
    }
  }

  focusCell(
    cellElement: HTMLElement,
    rowElement: HTMLElement,
    key: string,
    cellIndex: number
  ): void {
    let nextCellElement: Element | null = null;

    if (key === ARROW_LEFT) {
      nextCellElement = cellElement.previousElementSibling;
    } else if (key === ARROW_RIGHT) {
      nextCellElement = cellElement.nextElementSibling;
    } else if (key === ARROW_UP || key === ARROW_DOWN) {
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
    return this.getRowSelectedIdx(row, this.selected()) > -1;
  }

  getRowSelectedIdx(row: TRow, selected: any[]): number {
    if (!selected?.length) {
      return -1;
    }

    const rowId = this.rowIdentity()(row);
    return selected.findIndex(r => {
      const id = this.rowIdentity()(r);
      return id === rowId;
    });
  }
  protected isGroup(row: RowOrGroup<TRow>[]): row is Group<TRow>[];

  protected isGroup(row: RowOrGroup<TRow>): row is Group<TRow>;

  protected isGroup(row: RowOrGroup<TRow> | RowOrGroup<TRow>[]): boolean {
    return !!this.groupedRows();
  }

  protected isRow(row: RowOrGroup<TRow> | undefined): row is TRow {
    return !this.groupedRows();
  }
}
