import { MouseEvent, KeyboardEvent, Event } from '../events';

export type TableActivateEventType = 'keydown' | 'mouseenter' | 'click' | 'dblclick' | 'checkbox';

export interface TableActivateEvent {
  type: TableActivateEventType;
  event: MouseEvent | KeyboardEvent | Event;
  row: object;
  rowElement?: HTMLElement;
  cellIndex?: number;
  group?: any;
  rowHeight?: number;
  column?: object;
  value?: any;
  cellElement?: HTMLElement;
}
