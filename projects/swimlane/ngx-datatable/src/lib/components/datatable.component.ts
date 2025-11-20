import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  ContentChild,
  contentChildren,
  DoCheck,
  effect,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  Input,
  IterableDiffer,
  IterableDiffers,
  linkedSignal,
  model,
  numberAttribute,
  OnDestroy,
  OnInit,
  output,
  signal,
  TemplateRef,
  untracked,
  viewChild,
  ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs';

import { VisibilityDirective } from '../directives/visibility.directive';
import { NGX_DATATABLE_CONFIG, NgxDatatableConfig } from '../ngx-datatable.config';
import { ScrollbarHelper } from '../services/scrollbar-helper.service';
import {
  ColumnResizeEventInternal,
  ReorderEventInternal,
  TableColumnInternal
} from '../types/internal.types';
import {
  ActivateEvent,
  ColumnMode,
  ColumnResizeEvent,
  ContextMenuEvent,
  ContextmenuType,
  DragEventData,
  Group,
  PageEvent,
  PagerPageEvent,
  ReorderEvent,
  Row,
  RowOrGroup,
  ScrollEvent,
  SelectEvent,
  SelectionType,
  SortEvent,
  SortPropDir,
  SortType,
  TreeStatus
} from '../types/public.types';
import { TableColumn } from '../types/table-column.type';
import { toInternalColumn } from '../utils/column-helper';
import { adjustColumnWidths, forceFillColumnWidths } from '../utils/math';
import { numberOrUndefinedAttribute } from '../utils/number-or-undefined-attribute';
import { sortGroupedRows, sortRows } from '../utils/sort';
import { DATATABLE_COMPONENT_TOKEN } from '../utils/table-token';
import { throttleable } from '../utils/throttle';
import { groupRowsByParents, optionalGetterForProp } from '../utils/tree';
import { DatatableGroupHeaderDirective } from './body/body-group-header.directive';
import { DatatableRowDefDirective } from './body/body-row-def.component';
import { DataTableBodyComponent } from './body/body.component';
import { ProgressBarComponent } from './body/progress-bar.component';
import { DataTableColumnDirective } from './columns/column.directive';
import { DataTableFooterComponent } from './footer/footer.component';
import { DatatableFooterDirective } from './footer/footer.directive';
import { DataTableHeaderComponent } from './header/header.component';
import { DatatableRowDetailDirective } from './row-detail/row-detail.directive';

@Component({
  selector: 'ngx-datatable',
  imports: [
    VisibilityDirective,
    DataTableHeaderComponent,
    DataTableBodyComponent,
    DataTableFooterComponent,
    ProgressBarComponent
  ],
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.scss',
  providers: [
    {
      provide: DATATABLE_COMPONENT_TOKEN,
      useExisting: DatatableComponent
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ngx-datatable'
  }
})
export class DatatableComponent<TRow extends Row = any>
  implements OnInit, DoCheck, AfterViewInit, OnDestroy
{
  private scrollbarHelper = inject(ScrollbarHelper);
  private cd = inject(ChangeDetectorRef);
  private configuration =
    inject(NGX_DATATABLE_CONFIG, { optional: true }) ??
    // This is the old injection token for backward compatibility.
    inject<NgxDatatableConfig>('configuration' as any, { optional: true });

  /**
   * Template for the target marker of drag target columns.
   */
  readonly targetMarkerTemplate = input<TemplateRef<unknown>>();

  /**
   * Rows that are displayed in the table.
   */
  readonly rows = input<(TRow | undefined)[] | null | undefined>();

  /**
   * This attribute allows the user to set the name of the column to group the data with
   */
  readonly groupRowsBy = input<keyof TRow>();

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
  readonly groupedRows = input<Group<TRow>[]>();

  /**
   * Columns to be displayed.
   */
  readonly columns = input<TableColumn[]>();

  /**
   * List of row objects that should be
   * represented as selected in the grid.
   * Default value: `[]`
   */
  readonly selected = model<TRow[]>([]);

  /**
   * Enable vertical scrollbars
   */
  readonly scrollbarV = input(false, { transform: booleanAttribute });

  /**
   * Enable vertical scrollbars dynamically on demand.
   * Property `scrollbarV` needs to be set `true` too.
   * Width that is gained when no scrollbar is needed
   * is added to the inner table width.
   */
  readonly scrollbarVDynamic = input(false, { transform: booleanAttribute });

  /**
   * Enable horz scrollbars
   */
  readonly scrollbarH = input(false, { transform: booleanAttribute });

  /**
   * The row height; which is necessary
   * to calculate the height for the lazy rendering.
   */
  readonly rowHeight = input<number | 'auto' | ((row: TRow) => number)>(
    this.configuration?.rowHeight ?? 30
  );

  /**
   * Type of column width distribution formula.
   * Example: flex, force, standard
   */
  readonly columnMode = input<ColumnMode | keyof typeof ColumnMode>(ColumnMode.standard);

  /**
   * The minimum header height in pixels.
   * Pass a falsey for no header
   */
  readonly headerHeight = input<number | 'auto'>(this.configuration?.headerHeight ?? 30);

  /**
   * The minimum footer height in pixels.
   * Pass falsey for no footer
   */
  readonly footerHeight = input(this.configuration?.footerHeight ?? 0, {
    transform: numberAttribute
  });

  /**
   * If the table should use external paging
   * otherwise its assumed that all data is preloaded.
   */
  readonly externalPaging = input(false, { transform: booleanAttribute });

  /**
   * If the table should use external sorting or
   * the built-in basic sorting.
   */
  readonly externalSorting = input(false, { transform: booleanAttribute });

  /**
   * The page size to be shown.
   * Default value: `undefined`
   */
  readonly limit = input(undefined, {
    transform: numberOrUndefinedAttribute
  });

  /**
   * The total count of all rows.
   * Default value: `0`
   */
  readonly count = input(0, { transform: numberAttribute });

  /**
   * The current offset ( page - 1 ) shown.
   * Default value: `0`
   */
  @Input({ transform: numberAttribute }) set offset(val: number) {
    this._offset = val;
  }
  get offset(): number {
    return Math.max(Math.min(this._offset, Math.ceil(this.rowCount / this.pageSize()) - 1), 0);
  }

  /**
   * Show the linear loading bar.
   * Default value: `false`
   */
  readonly loadingIndicator = input(false, { transform: booleanAttribute });

  /**
   * Show ghost loaders on each cell.
   * Default value: `false`
   */
  readonly ghostLoadingIndicator = input(false, { transform: booleanAttribute });

  /**
   * Type of row selection. Options are:
   *
   *  - `single`
   *  - `multi`
   *  - `checkbox`
   *  - `multiClick`
   *  - `cell`
   *
   * For no selection pass a `falsey`.
   * Default value: `undefined`
   */
  readonly selectionType = input<SelectionType>();

  /**
   * Enable/Disable ability to re-order columns
   * by dragging them.
   */
  readonly reorderable = input(true, { transform: booleanAttribute });

  /**
   * Swap columns on re-order columns or
   * move them.
   */
  readonly swapColumns = input(true, { transform: booleanAttribute });

  /**
   * The type of sorting
   */
  readonly sortType = input<SortType>('single');

  /**
   * Array of sorted columns by property and type.
   * Default value: `[]`
   */
  readonly sorts = model<SortPropDir[]>([]);

  /**
   * Css class overrides
   */
  readonly cssClasses = input<Partial<Required<NgxDatatableConfig>['cssClasses']>>(
    this.configuration?.cssClasses ?? {}
  );

  /**
   * Message overrides for localization
   *
   * @defaultValue
   * ```
   * {
   *   emptyMessage: 'No data to display',
   *   totalMessage: 'total',
   *   selectedMessage: 'selected',
   *   ariaFirstPageMessage: 'go to first page',
   *   ariaPreviousPageMessage: 'go to previous page',
   *   ariaPageNMessage: 'page',
   *   ariaNextPageMessage: 'go to next page',
   *   ariaLastPageMessage: 'go to last page',
   *   ariaRowCheckboxMessage: 'Select row',
   *   ariaHeaderCheckboxMessage: 'Select all rows',
   *   ariaGroupHeaderCheckboxMessage: 'Select row group'
   * }
   * ```
   */
  readonly messages = input<Partial<Required<NgxDatatableConfig>['messages']>>(
    this.configuration?.messages ?? {}
  );

  /**
   * A function which is called with the row and should return either:
   * - a string: `"class-1 class-2`
   * - a Record<string, boolean>: `{ 'class-1': true, 'class-2': false }`
   */
  readonly rowClass = input<(row: TRow) => string | Record<string, boolean>>();

  /**
   * A boolean/function you can use to check whether you want
   * to select a particular row based on a criteria. Example:
   *
   *    (selection) => {
   *      return selection !== 'Ethel Price';
   *    }
   */
  readonly selectCheck = input<(value: TRow, index: number, array: TRow[]) => boolean>();

  /**
   * A function you can use to check whether you want
   * to show the checkbox for a particular row based on a criteria. Example:
   *
   *    (row, column, value) => {
   *      return row.name !== 'Ethel Price';
   *    }
   */
  readonly displayCheck = input<(row: TRow, column: TableColumn, value?: any) => boolean>();

  /**
   * A boolean you can use to set the detault behaviour of rows and groups
   * whether they will start expanded or not. If ommited the default is NOT expanded.
   *
   */
  readonly groupExpansionDefault = input(false, { transform: booleanAttribute });

  /**
   * Property to which you can use for custom tracking of rows.
   * Example: 'name'
   */
  readonly trackByProp = input<string>();

  /**
   * Property to which you can use for determining select all
   * rows on current page or not.
   */
  readonly selectAllRowsOnPage = input(false, { transform: booleanAttribute });

  /**
   * A flag for row virtualization on / off
   */
  readonly virtualization = input(true, { transform: booleanAttribute });

  /**
   * Tree from relation
   */
  readonly treeFromRelation = input<string>();

  /**
   * Tree to relation
   */
  readonly treeToRelation = input<string>();

  /**
   * A flag for switching summary row on / off
   */
  readonly summaryRow = input(false, { transform: booleanAttribute });

  /**
   * A height of summary row
   */
  readonly summaryHeight = input(30, { transform: numberAttribute });

  /**
   * A property holds a summary row position: top/bottom
   */
  readonly summaryPosition = input('top');

  /**
   * A function you can use to check whether you want
   * to disable a row. Example:
   *
   *    (row) => {
   *      return row.name !== 'Ethel Price';
   *    }
   */
  readonly disableRowCheck = input<(row: TRow) => boolean>();

  /**
   * A flag to enable drag behavior of native HTML5 drag and drop API on rows.
   * If set to true, {@link rowDragEvents} will emit dragstart and dragend events.
   */
  readonly rowDraggable = input(false, { transform: booleanAttribute });

  /**
   * A flag to controll behavior of sort states.
   * By default sort on column toggles between ascending and descending without getting removed.
   * Set true to clear sorting of column after performing ascending and descending sort on that column.
   */
  readonly enableClearingSortState = input(false, { transform: booleanAttribute });

  /**
   * Body was scrolled typically in a `scrollbarV:true` scenario.
   */
  readonly scroll = output<ScrollEvent>();

  /**
   * A cell or row was focused via keyboard or mouse click.
   */
  readonly activate = output<ActivateEvent<TRow>>();

  /**
   * A cell or row was selected.
   * @deprecated Use two-way binding on `selected` instead.
   *
   * Before:
   * ```html
   * <ngx-datatable [selected]="mySelection" (select)="onSelect($event)"></ngx-datatable>
   * ```
   *
   * After:
   * ```html
   * <ngx-datatable [selected]="mySelection" (selectedChange)="onSelect({selected: $event})"></ngx-datatable>
   * <!-- or -->
   * <ngx-datatable [(selected)]="mySelection"></ngx-datatable>
   * ```
   */
  readonly select = output<SelectEvent<TRow>>();

  /**
   * Column sort was invoked.
   * @deprecated Use two-way binding on `sorts` instead.
   *
   * Before:
   * ```html
   * <ngx-datatable [sorts]="mySorts" (sort)="onSort($event)"></ngx-datatable>
   * ```
   *
   * After:
   * ```html
   * <ngx-datatable [sorts]="mySorts" (sortsChange)="onSort({sorts: $event})"></ngx-datatable>
   * <!-- or -->
   * <ngx-datatable [(sorts)]="mySorts"></ngx-datatable>
   */
  readonly sort = output<SortEvent>();

  /**
   * The table was paged either triggered by the pager or the body scroll.
   */
  readonly page = output<PageEvent>();

  /**
   * Columns were re-ordered.
   */
  readonly reorder = output<ReorderEvent>();

  /**
   * Column was resized.
   */
  readonly resize = output<ColumnResizeEvent>();

  /**
   * The context menu was invoked on the table.
   * type indicates whether the header or the body was clicked.
   * content contains either the column or the row that was clicked.
   */
  readonly tableContextmenu = output<ContextMenuEvent<TRow>>();

  /**
   * A row was expanded ot collapsed for tree
   */
  readonly treeAction = output<{ row: TRow; rowIndex: number }>();

  /**
   * Emits HTML5 native drag events.
   * Only emits dragenter, dragover, drop events by default.
   * Set {@link rowDraggable} to true for dragstart and dragend.
   */
  readonly rowDragEvents = output<DragEventData>();

  /**
   * CSS class applied if the header height if fixed height.
   */
  @HostBinding('class.fixed-header')
  get isFixedHeader(): boolean {
    const headerHeight: number | string = this.headerHeight();
    return typeof headerHeight === 'string' ? (headerHeight as string) !== 'auto' : true;
  }

  /**
   * CSS class applied to the root element if
   * the row heights are fixed heights.
   */
  @HostBinding('class.fixed-row')
  get isFixedRow(): boolean {
    return this.rowHeight() !== 'auto';
  }

  /**
   * CSS class applied to root element if
   * vertical scrolling is enabled.
   */
  @HostBinding('class.scroll-vertical')
  get isVertScroll(): boolean {
    return this.scrollbarV();
  }

  /**
   * CSS class applied to root element if
   * virtualization is enabled.
   */
  @HostBinding('class.virtualized')
  get isVirtualized(): boolean {
    return this.virtualization();
  }

  /**
   * CSS class applied to the root element
   * if the horziontal scrolling is enabled.
   */
  @HostBinding('class.scroll-horz')
  get isHorScroll(): boolean {
    return this.scrollbarH();
  }

  /**
   * CSS class applied to root element is selectable.
   */
  @HostBinding('class.selectable')
  get isSelectable(): boolean {
    return this.selectionType() !== undefined;
  }

  /**
   * CSS class applied to root is checkbox selection.
   */
  @HostBinding('class.checkbox-selection')
  get isCheckboxSelection(): boolean {
    return this.selectionType() === 'checkbox';
  }

  /**
   * CSS class applied to root if cell selection.
   */
  @HostBinding('class.cell-selection')
  get isCellSelection(): boolean {
    return this.selectionType() === 'cell';
  }

  /**
   * CSS class applied to root if single select.
   */
  @HostBinding('class.single-selection')
  get isSingleSelection(): boolean {
    return this.selectionType() === 'single';
  }

  /**
   * CSS class added to root element if mulit select
   */
  @HostBinding('class.multi-selection')
  get isMultiSelection(): boolean {
    return this.selectionType() === 'multi';
  }

  /**
   * CSS class added to root element if mulit click select
   */
  @HostBinding('class.multi-click-selection')
  get isMultiClickSelection(): boolean {
    return this.selectionType() === 'multiClick';
  }

  /**
   * Column templates gathered from `ContentChildren`
   * if described in your markup.
   */
  readonly columnTemplates =
    contentChildren<DataTableColumnDirective<TRow>>(DataTableColumnDirective);

  /**
   * Row Detail templates gathered from the ContentChild
   */
  @ContentChild(DatatableRowDetailDirective)
  rowDetail?: DatatableRowDetailDirective;

  /**
   * Group Header templates gathered from the ContentChild
   */
  @ContentChild(DatatableGroupHeaderDirective)
  groupHeader?: DatatableGroupHeaderDirective;

  /**
   * Footer template gathered from the ContentChild
   */
  @ContentChild(DatatableFooterDirective)
  footer?: DatatableFooterDirective;

  /**
   * Reference to the body component for manually
   * invoking functions on the body.
   */
  @ViewChild(DataTableBodyComponent)
  bodyComponent!: DataTableBodyComponent<TRow & { treeStatus?: TreeStatus }>;

  /**
   * Reference to the header component for manually
   * invoking functions on the header.
   */
  @ViewChild(DataTableHeaderComponent)
  headerComponent!: DataTableHeaderComponent;

  @ViewChild(DataTableHeaderComponent, { read: ElementRef })
  headerElement?: ElementRef<HTMLElement>;

  @ViewChild(DataTableBodyComponent, { read: ElementRef })
  private bodyElement!: ElementRef<HTMLElement>;

  @ContentChild(DatatableRowDefDirective, {
    read: TemplateRef
  })
  rowDefTemplate?: TemplateRef<any>;

  /**
   * Returns if all rows are selected.
   */
  get allRowsSelected(): boolean {
    const selected = this.selected();
    let allRowsSelected = this.rows() && selected && selected.length === this.rows()!.length;

    if (this.bodyComponent && this.selectAllRowsOnPage()) {
      const indexes = this.bodyComponent.indexes;
      const rowsOnPage = indexes().last - indexes().first;
      allRowsSelected = selected.length === rowsOnPage;
    }

    return !!(selected && this.rows()?.length !== 0 && allRowsSelected);
  }

  element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  readonly _innerWidth = computed(() => this.dimensions().width);
  readonly pageSize = computed(() => this.calcPageSize());
  readonly bodyHeight = computed(() => {
    if (this.scrollbarV()) {
      let height = this.dimensions().height;
      if (this.headerElement) {
        height = height - this.headerElement.nativeElement.getBoundingClientRect().height;
      }
      return height - this.footerHeight();
    }
    return 0;
  });
  rowCount = 0;
  rowDiffer: IterableDiffer<TRow | undefined> = inject(IterableDiffers).find([]).create();
  /** This counter is increased, when the rowDiffer detects a change. This will cause an update of _internalRows. */
  private readonly _rowDiffCount = signal(0);

  _offsetX = 0;
  _offset = 0;
  readonly _internalRows = computed(() => {
    this._rowDiffCount(); // to trigger recalculation when row differ detects a change
    let rows = this.rows()?.slice() ?? [];

    const sorts = this.sorts();
    if (sorts.length && !this.externalSorting()) {
      rows = sortRows(rows, this._internalColumns(), this.sorts());
    }

    if (this.treeFromRelation() && this.treeToRelation()) {
      rows = groupRowsByParents(
        rows,
        optionalGetterForProp(this.treeFromRelation()),
        optionalGetterForProp(this.treeToRelation())
      );
    }

    if (this.ghostLoadingIndicator() && this.scrollbarV() && !this.externalPaging()) {
      // in case where we don't have predefined total page length
      rows.push(undefined); // undefined row will render ghost cell row at the end of the page
    }

    return rows;
  });

  readonly _internalGroupedRows = computed(() => {
    let groupedRows = this.groupedRows();
    const groupRowsBy = this.groupRowsBy();

    if (!groupedRows && groupRowsBy) {
      this._rowDiffCount(); // to trigger recalculation when row differ detects a change
      groupedRows = this.groupArrayBy(this.rows() ?? [], groupRowsBy);
    }

    if (!groupedRows) {
      // return here to prevent subscription to sorts when no grouping
      return undefined;
    }

    const sorts = this.sorts();
    if (sorts.length && !this.externalSorting()) {
      if (groupedRows?.length) {
        groupedRows = sortGroupedRows(
          groupedRows,
          this._internalColumns(),
          sorts,
          sorts.find(sortColumns => sortColumns.prop === groupRowsBy)
        );
      }
    }

    return groupedRows;
  });

  // TODO: consider removing internal modifications of the columns.
  // This requires a different strategy for certain properties like width.
  readonly _internalColumns = linkedSignal(() =>
    this.recalculateColumns(
      toInternalColumn(
        this.columnTemplates().length
          ? this.columnTemplates().map(c => c.column())
          : (this.columns() ?? []),
        this._defaultColumnWidth
      )
    )
  );
  _subscriptions: Subscription[] = [];
  _defaultColumnWidth = this.configuration?.defaultColumnWidth ?? 150;
  /**
   * To have this available for all components.
   * The Footer itself is not available in the injection context in templates,
   * so we need to get if from here until we have a state service.
   */
  readonly _footerComponent = viewChild(DataTableFooterComponent);
  protected verticalScrollVisible = false;
  // In case horizontal scroll is enabled
  // the column widths are initially calculated without vertical scroll offset
  // this makes horizontal scroll to appear on load even if columns can fit in view
  // this will be set to true once rows are available and rendered on UI
  private readonly _rowInitDone = signal(false);
  private readonly dimensions = signal<Pick<DOMRect, 'width' | 'height'>>({ height: 0, width: 0 });

  constructor() {
    // TODO: This should be a computed signal.
    // Effect to handle recalculate when limit or count changes
    effect(() => {
      // Track limit and count changes
      this.limit();
      this.count();
      // Recalculate without tracking other signals
      untracked(() => this.recalculateDims());
    });
    // Recalculates the rowCount when internal rows change
    // TODO: This should be a computed signal.
    effect(() => {
      this._internalRows();
      this.rowCount = untracked(() => this.calcRowCount());
    });
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

  /*
   * Lifecycle hook that is called when Angular dirty checks a directive.
   */
  ngDoCheck(): void {
    const rowDiffers = this.rowDiffer.diff(this.rows());
    if (rowDiffers || this.disableRowCheck()) {
      this._rowDiffCount.update(count => count + 1);
      if (rowDiffers) {
        queueMicrotask(() => {
          this._rowInitDone.set(true);
          this.recalculate();
          this.cd.markForCheck();
        });
      }

      this.recalculatePages();
      this.cd.markForCheck();
    }
  }

  /**
   * Lifecycle hook that is called after a component's
   * view has been fully initialized.
   */
  ngAfterViewInit(): void {
    // this has to be done to prevent the change detection
    // tree from freaking out because we are readjusting
    if (typeof requestAnimationFrame === 'undefined') {
      return;
    }

    requestAnimationFrame(() => {
      this.recalculate();

      // emit page for virtual server-side kickoff
      if (this.externalPaging() && this.scrollbarV()) {
        this.page.emit({
          count: this.count(),
          pageSize: this.pageSize(),
          limit: this.limit(),
          offset: 0,
          sorts: this.sorts()
        });
      }
    });
  }

  /**
   * This will be used when displaying or selecting rows.
   * when tracking/comparing them, we'll use the value of this fn,
   *
   * (`fn(x) === fn(y)` instead of `x === y`)
   */
  readonly rowIdentity = input<(x: RowOrGroup<TRow>) => unknown>(x => {
    if (this.groupRowsBy()) {
      // each group in groupedRows are stored as {key, value: [rows]},
      // where key is the groupRowsBy index
      return (x as Group<TRow>).key ?? x;
    } else {
      return x;
    }
  });

  /**
   * Creates a map with the data grouped by the user choice of grouping index
   *
   * @param originalArray the original array passed via parameter
   * @param groupBy the key of the column to group the data by
   */
  groupArrayBy(originalArray: (TRow | undefined)[], groupBy: keyof TRow) {
    // create a map to hold groups with their corresponding results
    const map = new Map<TRow[keyof TRow], TRow[]>();
    let i = 0;

    originalArray.forEach(item => {
      if (!item) {
        // skip undefined items
        return;
      }

      const key = item[groupBy];
      const value = map.get(key);
      if (!value) {
        map.set(key, [item]);
      } else {
        value.push(item);
      }
      i++;
    });

    const addGroup = (key: TRow[keyof TRow], value: TRow[]) => ({ key, value });

    // convert map back to a simple array of objects
    return Array.from(map, x => addGroup(x[0], x[1]));
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
    this._internalColumns.set(this.recalculateColumns(this._internalColumns().slice()));
    this.cd.markForCheck();
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
    columns: TableColumnInternal[],
    forceIdx = -1,
    allowBleed: boolean = this.scrollbarH()
  ): TableColumnInternal[] {
    let width = this._innerWidth();
    if (!width) {
      return [];
    }
    const bodyElement = this.bodyElement?.nativeElement;
    this.verticalScrollVisible = bodyElement?.scrollHeight > bodyElement?.clientHeight;
    if (this.scrollbarV() || this.scrollbarVDynamic()) {
      width =
        width -
        (this.verticalScrollVisible || !this._rowInitDone() ? this.scrollbarHelper.width : 0);
    }

    if (this.columnMode() === ColumnMode.force) {
      forceFillColumnWidths(
        columns,
        width,
        forceIdx,
        allowBleed,
        this._defaultColumnWidth,
        this.scrollbarHelper.width
      );
    } else if (this.columnMode() === ColumnMode.flex) {
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
    this.dimensions.set(dims);

    this.recalculatePages();
  }

  /**
   * Recalculates the pages after a update.
   */
  recalculatePages(): void {
    this.rowCount = this.calcRowCount();
  }

  /**
   * Body triggered a page event.
   */
  onBodyPage(offset: number): void {
    // Avoid pagination caming from body events like scroll when the table
    // has no virtualization and the external paging is enable.
    // This means, let's the developer handle pagination by my him(her) self
    if (this.externalPaging() && !this.virtualization()) {
      return;
    }

    this.offset = offset;

    if (!isNaN(this.offset)) {
      this.page.emit({
        count: this.count(),
        pageSize: this.pageSize(),
        limit: this.limit(),
        offset: this.offset,
        sorts: this.sorts()
      });
    }
  }

  /**
   * The body triggered a scroll event.
   */
  onBodyScroll(event: ScrollEvent): void {
    this._offsetX = event.offsetX;
    this.scroll.emit(event);
  }

  /**
   * The footer triggered a page event.
   */
  onFooterPage(event: PagerPageEvent) {
    this.offset = event.page - 1;
    this.bodyComponent.updateOffsetY(this.offset);

    this.page.emit({
      count: this.count(),
      pageSize: this.pageSize(),
      limit: this.limit(),
      offset: this.offset,
      sorts: this.sorts()
    });

    if (this.selectAllRowsOnPage()) {
      this.selected.set([]);
      this.select.emit({
        selected: this.selected()
      });
    }
  }

  /**
   * Recalculates the sizes of the page
   */
  calcPageSize(): number {
    // Keep the page size constant even if the row has been expanded.
    // This is because an expanded row is still considered to be a child of
    // the original row.  Hence calculation would use rowHeight only.
    if (this.scrollbarV() && this.virtualization()) {
      const size = Math.ceil(this.bodyHeight() / (this.rowHeight() as number));
      return Math.max(size, 0);
    }

    // if limit is passed, we are paging
    const limit = this.limit();
    if (limit !== undefined) {
      return limit;
    }

    // otherwise use row length
    return this.rows()?.length ?? 0;
  }

  /**
   * Calculates the row count.
   */
  calcRowCount(): number {
    if (!this.externalPaging()) {
      const groupedRows = this._internalGroupedRows();
      if (groupedRows) {
        return groupedRows.length;
      } else {
        return this._internalRows().length;
      }
    }

    return this.count();
  }

  /**
   * The header triggered a contextmenu event.
   */
  onColumnContextmenu({ event, column }: { event: MouseEvent; column: TableColumn }): void {
    this.tableContextmenu.emit({ event, type: ContextmenuType.header, content: column });
  }

  /**
   * The body triggered a contextmenu event.
   */
  onRowContextmenu({ event, row }: { event: MouseEvent; row: RowOrGroup<TRow> }): void {
    this.tableContextmenu.emit({ event, type: ContextmenuType.body, content: row });
  }

  /**
   * The header triggered a column resize event.
   */
  onColumnResize({ column, newValue, prevValue }: ColumnResizeEventInternal): void {
    /* Safari/iOS 10.2 workaround */
    if (column === undefined) {
      return;
    }

    const idx = this._internalColumns().indexOf(column);
    const cols = this._internalColumns().map(col => ({ ...col }));
    cols[idx].width = newValue;
    // set this so we can force the column
    // width distribution to be to this value
    cols[idx].$$oldWidth = newValue;
    this._internalColumns.set(this.recalculateColumns(cols, idx));

    this.resize.emit({
      column,
      newValue,
      prevValue
    });
  }

  onColumnResizing({ column, newValue }: ColumnResizeEventInternal): void {
    if (column === undefined) {
      return;
    }
    column.width = newValue;
    column.$$oldWidth = newValue;
    const idx = this._internalColumns().indexOf(column);
    this._internalColumns.set(this.recalculateColumns(this._internalColumns().slice(), idx));
  }

  /**
   * The header triggered a column re-order event.
   */
  onColumnReorder(event: ReorderEventInternal): void {
    const { column, newValue, prevValue } = event;
    const cols = this._internalColumns().map(c => ({ ...c }));
    const prevCol = cols[newValue];
    if (column.frozenLeft !== prevCol.frozenLeft || column.frozenRight !== prevCol.frozenRight) {
      return;
    }

    if (this.swapColumns()) {
      cols[newValue] = column;
      cols[prevValue] = prevCol;
    } else {
      if (newValue > prevValue) {
        const movedCol = cols[prevValue];
        for (let i = prevValue; i < newValue; i++) {
          cols[i] = cols[i + 1];
        }
        cols[newValue] = movedCol;
      } else {
        const movedCol = cols[prevValue];
        for (let i = prevValue; i > newValue; i--) {
          cols[i] = cols[i - 1];
        }
        cols[newValue] = movedCol;
      }
    }

    this._internalColumns.set(cols);

    this.reorder.emit(event);
  }

  /**
   * The header triggered a column sort event.
   */
  onColumnSort(event: SortEvent): void {
    // clean selected rows
    if (this.selectAllRowsOnPage()) {
      this.selected.set([]);
      this.select.emit({
        selected: this.selected()
      });
    }

    this.sorts.set(event.sorts);

    // Always go to first page when sorting to see the newly sorted data
    this.offset = 0;
    this.bodyComponent.updateOffsetY(this.offset);
    // Emit the page object with updated offset value
    this.page.emit({
      count: this.count(),
      pageSize: this.pageSize(),
      limit: this.limit(),
      offset: this.offset,
      sorts: this.sorts()
    });
    this.sort.emit(event);
  }

  /**
   * Toggle all row selection
   */
  onHeaderSelect(): void {
    if (this.bodyComponent && this.selectAllRowsOnPage()) {
      // before we splice, chk if we currently have all selected
      const first = this.bodyComponent.indexes().first;
      const last = this.bodyComponent.indexes().last;
      const allSelected = this.selected().length === last - first;

      // do the opposite here
      if (!allSelected) {
        this.selected.set(
          this._internalRows()
            .slice(first, last)
            .filter(row => !!row) as TRow[]
        );
      } else {
        this.selected.set([]);
      }
    } else {
      let relevantRows: TRow[];
      const disableRowCheckFn = this.disableRowCheck();
      if (disableRowCheckFn) {
        relevantRows = (this.rows() ?? []).filter(
          (row => row && !disableRowCheckFn(row)) as (row: TRow | undefined) => row is TRow
        );
      } else {
        relevantRows = (this.rows() ?? []).filter(row => !!row);
      }
      // before we splice, chk if we currently have all selected
      const allSelected = this.selected().length === relevantRows.length;
      // do the opposite here
      if (!allSelected) {
        this.selected.set(relevantRows);
      } else {
        this.selected.set([]);
      }
    }

    this.select.emit({
      selected: this.selected()
    });
  }

  /**
   * A row was selected from body
   */
  onBodySelect(selected: TRow[]): void {
    this.select.emit({ selected });
  }

  /**
   * A row was expanded or collapsed for tree
   */
  onTreeAction(event: { row: TRow }) {
    const row = event.row;
    // TODO: For duplicated items this will not work
    const treeToRel = this.treeToRelation();
    const rowIndex = (this.rows() ?? []).findIndex(
      r => r && r[treeToRel!] === event.row[treeToRel!]
    );
    this.treeAction.emit({ row, rowIndex });
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
