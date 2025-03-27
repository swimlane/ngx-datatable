import { TableColumn, TableColumnProp } from './table-column.type';
import { ValueGetter } from '../utils/column-prop-getters';
import { SortDirection } from './public.types';

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
  event: MouseEvent;
  element: HTMLElement;
  model: TableColumnInternal;
}

export interface InnerSortEvent {
  column: TableColumnInternal;
  prevValue: SortDirection;
  newValue: SortDirection;
}

export interface TableColumnInternal<TRow = any> extends TableColumn<TRow> {
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
  prop: TableColumnProp;
  name: string;
  width: number;
}

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
