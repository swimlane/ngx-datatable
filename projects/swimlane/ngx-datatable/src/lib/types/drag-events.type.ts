import { TableColumn } from './table-column.type';

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

export interface DraggableDragEvent {
  event: MouseEvent;
  element: HTMLElement;
  model: TableColumn;
}
