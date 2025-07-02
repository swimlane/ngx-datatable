import { TableColumn, TableColumnProp } from './table-column.type';

export interface SortPropDir {
  dir: SortDirection | 'desc' | 'asc';
  prop: TableColumnProp;
}

/**
 * @deprecated The constant `SortDirection` should no longer be used. Instead use the value directly:
 * ```
 * // old
 * const sortDir: SortDirection = SortDirection.asc;
 * // new
 * const sortDir: SortDirection = 'asc';
 * ```
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SortDirection = {
  asc: 'asc',
  desc: 'desc'
} as const;

export type SortDirection = (typeof SortDirection)[keyof typeof SortDirection];

export interface SortEvent {
  column: TableColumn;
  prevValue: SortDirection | undefined;
  newValue: SortDirection | undefined;
  sorts: SortPropDir[];
}

/**
 * @deprecated The constant `SortType` should no longer be used. Instead use the value directly:
 * ```
 * // old
 * const sortType: SortType = SortType.single;
 * // new
 * const sortType: SortType = 'single';
 * ```
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SortType = {
  single: 'single',
  multi: 'multi'
} as const;

export type SortType = (typeof SortType)[keyof typeof SortType];

/**
 * @deprecated The constant `ColumnMode` should no longer be used. Instead use the value directly:
 * ```
 * // old
 * <ngx-datatable [columnMode]="ColumnMode.force"></ngx-datatable>
 * // new
 * <ngx-datatable [columnMode]="'force'"></ngx-datatable>
 * ```
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ColumnMode = {
  standard: 'standard',
  flex: 'flex',
  force: 'force'
} as const;

export type ColumnMode = (typeof ColumnMode)[keyof typeof ColumnMode];

export type TreeStatus = 'collapsed' | 'expanded' | 'loading' | 'disabled';

export interface ActivateEvent<TRow> {
  type: 'checkbox' | 'click' | 'dblclick' | 'keydown' | 'mouseenter';
  event: Event;
  row: TRow;
  group?: TRow[];
  rowHeight?: number;
  column?: TableColumn;
  value?: any;
  cellElement?: HTMLElement;
  treeStatus?: TreeStatus;
  cellIndex?: number;
  rowElement: HTMLElement;
}

export interface HeaderCellContext {
  column: TableColumn;
  sortDir: SortDirection | 'asc' | 'desc' | undefined;
  sortFn: () => void;
  allRowsSelected?: boolean;
  selectFn: () => void;
}

export interface GroupContext<TRow extends Row = any> {
  group: Group<TRow>;
  expanded: boolean;
  rowIndex: number;
}

export interface CellContext<TRow extends Row = any> {
  onCheckboxChangeFn: (event: Event) => void;
  activateFn: (event: ActivateEvent<TRow>) => void;
  row: TRow;
  group?: TRow[];
  value: any;
  column: TableColumn;
  rowHeight: number;
  isSelected?: boolean;
  rowIndex: number;
  rowInGroupIndex?: number;
  treeStatus?: TreeStatus;
  disabled?: boolean;
  onTreeAction: () => void;
  expanded?: boolean;
}

export interface FooterContext {
  rowCount: number;
  pageSize: number;
  selectedCount: number;
  curPage: number;
  offset: number;
}

/**
 * @deprecated The constant `ContextmenuType` should no longer be used. Instead use the value directly:
 * ```
 * // old
 * const contextmenuType: ContextmenuType = ContextmenuType.header;
 * // new
 * const contextmenuType: ContextmenuType = 'header';
 * ```
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ContextmenuType = {
  header: 'header',
  body: 'body'
} as const;

export type ContextmenuType = (typeof ContextmenuType)[keyof typeof ContextmenuType];

/** A Group row */
export interface Group<TRow> {
  /** The value by which to rows are grouped. */
  key: TRow[keyof TRow];
  /** All rows that are part of the group. */
  value: TRow[];
}

/** Type for either a row or a group */
export type RowOrGroup<TRow> = TRow | Group<TRow>;

export interface RowDetailContext<TRow extends Row = any> {
  row: TRow;
  expanded: boolean;
  rowIndex: number;
  disabled?: boolean;
}

/**
 * Consumer provided rows should extend this interface
 * to get access to implicit row properties which are set by the datatable if required.
 */
export interface Row {
  [key: TableColumnProp]: any;
  treeStatus?: TreeStatus;
  level?: number;
}

export interface ReorderEvent {
  column: TableColumn;
  prevValue: number;
  newValue: number;
}

export interface PageEvent {
  count: number;
  pageSize: number;
  /** @deprecated Use {@link pageSize} instead. */
  limit: number | undefined;
  offset: number;
  sorts: SortPropDir[];
}

export interface PagerPageEvent {
  page: number;
}

export interface ColumnResizeEvent {
  column: TableColumn;
  prevValue: number;
  newValue: number;
}

export interface ScrollEvent {
  offsetY: number;
  offsetX: number;
}

export interface GroupToggleEvent<TRow> {
  type: 'group';
  value: Group<TRow>;
}

export interface AllGroupsToggleEvent {
  type: 'all';
  value: boolean;
}

export type GroupToggleEvents<TRow> = GroupToggleEvent<TRow> | AllGroupsToggleEvent;

export interface DetailToggleEvent<TRow> {
  type: 'row';
  value: TRow;
}

export interface AllDetailToggleEvent {
  type: 'all';
  value: boolean;
}

export type DetailToggleEvents<TRow> = DetailToggleEvent<TRow> | AllDetailToggleEvent;

/**
 * @deprecated The constant `SelectionType` should no longer be used. Instead use the value directly:
 * ```
 * // old
 * <ngx-datatable [selectionType]="SelectionType.multi"></ngx-datatable>
 * // new
 * <ngx-datatable [selectionType]="'multi'"></ngx-datatable>
 * ```
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SelectionType = {
  single: 'single',
  multi: 'multi',
  multiClick: 'multiClick',
  cell: 'cell',
  checkbox: 'checkbox'
} as const;

export type SelectionType = (typeof SelectionType)[keyof typeof SelectionType];

export interface SelectEvent<TRow> {
  selected: TRow[];
}

export interface ContextMenuEventBody<TRow> {
  event: MouseEvent;
  type: 'body';
  content: RowOrGroup<TRow>;
}

export interface ContextMenuEvenHeader {
  event: MouseEvent;
  type: 'header';
  content: TableColumn;
}

export type ContextMenuEvent<TRow> = ContextMenuEventBody<TRow> | ContextMenuEvenHeader;

export type DragEventType =
  | 'drag'
  | 'dragend'
  | 'dragenter'
  | 'dragleave'
  | 'dragover'
  | 'dragstart'
  | 'drop';

export interface DragEventData {
  event: DragEvent;
  srcElement: HTMLElement;
  targetElement?: HTMLElement;
  eventType: DragEventType;
  dragRow: any;
  dropRow?: any;
}
