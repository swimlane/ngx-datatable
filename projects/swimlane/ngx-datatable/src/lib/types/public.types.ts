import { TableColumn, TableColumnProp } from './table-column.type';

export interface SortPropDir {
  dir: SortDirection | 'desc' | 'asc';
  prop: TableColumnProp;
}

export enum SortDirection {
  asc = 'asc',
  desc = 'desc'
}

export interface SortEvent {
  column: TableColumn;
  prevValue: SortDirection | undefined;
  newValue: SortDirection | undefined;
  sorts: SortPropDir[];
}

export enum SortType {
  single = 'single',
  multi = 'multi'
}

export enum ColumnMode {
  standard = 'standard',
  flex = 'flex',
  force = 'force'
}

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

export enum ContextmenuType {
  header = 'header',
  body = 'body'
}

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

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox'
}

export interface SelectEvent<TRow> {
  selected: TRow[];
}

export interface ContextMenuEventBody<TRow> {
  event: MouseEvent;
  type: ContextmenuType.body;
  content: RowOrGroup<TRow>;
}

export interface ContextMenuEvenHeader {
  event: MouseEvent;
  type: ContextmenuType.header;
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
