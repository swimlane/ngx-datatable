import { TableColumn } from './table-column.type';

export type PinDirection = 'left' | 'center' | 'right';

export interface PinnedColumns {
  type: PinDirection;
  columns: TableColumn[];
}

export interface ColumnGroupWidth {
  left: number;
  center: number;
  right: number;
  total: number;
}

export interface OrderableReorderEvent {
  prevIndex: number;
  newIndex: number;
  model: TableColumn;
}

export interface TargetChangedEvent {
  newIndex?: number;
  prevIndex: number;
  initialIndex: number;
}

export interface Page {
  number: number;
  text: string;
}

export interface DraggableDragEvent {
  event: MouseEvent;
  element: HTMLElement;
  model: TableColumn;
}
