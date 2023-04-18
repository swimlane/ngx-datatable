export type DragEventType = 'drag' | 'dragend' | 'dragenter' | 'dragleave' | 'dragover' | 'dragstart' | 'drop';

export interface DragEventData {
  event: DragEvent;
  srcElement: HTMLElement;
  targetElement?: HTMLElement;
  eventType: DragEventType;
  dragRow: any;
  dropRow?: any;
}
