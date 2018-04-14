declare let global: any;

/* tslint:disable:variable-name */
export const MouseEvent = ((global as any) || (window as any)).MouseEvent as MouseEvent;
export const KeyboardEvent = ((global as any) || (window as any)).KeyboardEvent as KeyboardEvent;
export const Event = ((global as any) || (window as any)).Event as Event;
