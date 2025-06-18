import { TableColumn, TableColumnProp } from './table-column.type';
import { ValueGetter } from '../utils/column-prop-getters';
import { Row, SortDirection, TreeStatus } from './public.types';

export type PinDirection = 'left' | 'center' | 'right';

export interface PinnedColumns {
  type: PinDirection;
  columns: TableColumnInternal[];
}

export interface ColumnGroupWidth {
  left: number;
  center: number;
  right: number;
  total: number;
}

export interface TargetChangedEvent {
  newIndex?: number;
  prevIndex: number;
  initialIndex: number;
}

export interface ColumnResizeEventInternal {
  column: TableColumnInternal;
  prevValue: number;
  newValue: number;
}

export interface ReorderEventInternal {
  column: TableColumnInternal;
  prevValue: number;
  newValue: number;
}

export interface Page {
  number: number;
  text: string;
}

export interface DraggableDragEvent {
  event: MouseEvent | TouchEvent;
  element: HTMLElement;
  model: TableColumnInternal;
}

export interface InnerSortEvent {
  column: SortableTableColumnInternal;
  prevValue: SortDirection | undefined;
  newValue: SortDirection | undefined;
}

export interface CellActiveEvent<TRow> {
  type: 'checkbox' | 'click' | 'dblclick' | 'keydown' | 'mouseenter';
  event: Event;
  row: TRow;
  group?: TRow[];
  rowHeight?: number;
  column?: TableColumn;
  value?: any;
  cellElement?: HTMLElement;
  treeStatus?: TreeStatus;
}

export interface BaseTableColumnInternal<TRow extends Row = any> extends TableColumn<TRow> {
  /** Internal unique id */
  $$id: string;

  /** Internal for column width distributions */
  $$oldWidth?: number;

  /** Internal for setColumnDefaults */
  $$valueGetter: ValueGetter;

  dragging?: boolean;
  isTarget?: boolean;
  targetMarkerContext?: any;

  // Those properties are never null on the internal type:
  name: string;
  width: number;
}

export interface StandardTableColumnInternal<TRow extends Row = any>
  extends BaseTableColumnInternal<TRow> {
  sortable?: false;
}

export interface SortableTableColumnInternal<TRow extends Row = any>
  extends BaseTableColumnInternal<TRow> {
  comparator: Exclude<TableColumn['comparator'], undefined>;
  prop: TableColumnProp;
  sortable: true;
}

export type TableColumnInternal<TRow extends Row = any> =
  | StandardTableColumnInternal<TRow>
  | SortableTableColumnInternal<TRow>;

export interface TableColumnGroup {
  left: TableColumnInternal[];
  center: TableColumnInternal[];
  right: TableColumnInternal[];
}

/** Represents the index of a row. */
export interface RowIndex {
  /** Index of the row. If the row is inside a group, it will hold the index the group. */
  index: number;
  /** Index of a row inside a group. Only present if the row is inside a group. */
  indexInGroup?: number;
}
