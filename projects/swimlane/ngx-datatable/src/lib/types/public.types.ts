import { TableColumn, TableColumnProp } from './table-column.type';
import { BehaviorSubject, Observable } from 'rxjs';

export interface SortPropDir {
  dir: SortDirection | 'desc' | 'asc';
  prop: TableColumnProp;
}

export enum SortDirection {
  asc = 'asc',
  desc = 'desc'
}

export interface InnerSortEvent {
  column: TableColumn;
  prevValue: SortDirection;
  newValue: SortDirection;
}

export interface SortEvent extends InnerSortEvent {
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
  event: MouseEvent | KeyboardEvent;
  row: TRow;
  group?: TRow[];
  rowHeight?: number;
  column?: TableColumn;
  value?: any;
  cellElement?: HTMLElement;
  treeStatus?: TreeStatus;
  cellIndex?: number;
  rowElement?: HTMLElement;
}

export interface HeaderCellContext {
  column: TableColumn;
  sortDir: SortDirection | 'asc' | 'desc';
  sortFn: () => void;
  allRowsSelected: boolean;
  selectFn: () => void;
}

export interface GroupContext<TRow = any> {
  group: Group<TRow>;
  expanded: boolean;
  rowIndex: number;
}

export interface CellContext<TRow = any> {
  onCheckboxChangeFn: (event: Event) => void;
  activateFn: (event: ActivateEvent<TRow>) => void;
  row: TRow;
  group: TRow[];
  value: any;
  column: TableColumn;
  rowHeight: number;
  isSelected: boolean;
  rowIndex: number;
  treeStatus: TreeStatus;
  disable$: BehaviorSubject<boolean>;
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

export interface RowDetailContext<TRow = any> {
  row: TRow;
  expanded: boolean;
  rowIndex: number;
  disableRow$?: Observable<boolean>;
}

export interface ReorderEvent {
  column: TableColumn;
  prevValue: number;
  newValue: number;
}

export interface PageEvent {
  count: number;
  pageSize: number;
  limit: number;
  offset: number;
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

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox'
}

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
