import { TableColumn } from './table-column.type';

export interface OrderPosition {
  left: number;
  right: number;
  index: number;
  element: HTMLElement;
}

export interface OrderableReorderEvent {
  prevIndex: number;
  newIndex: number;
  model: TableColumn;
}

export interface ReorderEvent {
  column: TableColumn;
  prevValue: number;
  newValue: number;
}

export interface TargetChangedEvent {
  newIndex?: number;
  prevIndex: number;
  initialIndex: number;
}
