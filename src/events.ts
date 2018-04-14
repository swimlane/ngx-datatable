declare let global: any;

/* tslint:disable:variable-name */
export const MouseEvent = ((window as any) || (global as any)).MouseEvent as MouseEvent;
export const KeyboardEvent = ((window as any) || (global as any)).KeyboardEvent as KeyboardEvent;
export const Event = ((window as any) || (global as any)).Event as Event;
