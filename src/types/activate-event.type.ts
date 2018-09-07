import { MouseEvent, KeyboardEvent, Event } from '../events';
import { InjectionToken } from '@angular/core';
import { TableColumn } from './table-column.type';

const defaultEvents: TableActivateEventType[] = [
  'keydown',
  'mouseenter',
  'click',
  'dblclick',
  'checkbox'
];

export const NGX_DATATABLE_ACTIVATE_EVENTS = new InjectionToken<TableActivateEventType[]>('activate events types', {
  factory: () => defaultEvents
});

export type TableActivateEventType = 'keydown' | 'mouseenter' | 'click' | 'dblclick' | 'checkbox';

export interface TableActivateEvent {
  type: TableActivateEventType;
  event: MouseEvent | KeyboardEvent | Event;
  row: any;
  rowElement?: HTMLElement;
  cellIndex?: number;
  group?: any;
  rowHeight?: number;
  column?: TableColumn;
  value?: any;
  cellElement?: HTMLElement;
}
