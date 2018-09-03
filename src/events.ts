declare let global: any;

/* tslint:disable */
export const MouseEvent = (((typeof window !== 'undefined' && window) as any) || (global as any)).MouseEvent as MouseEvent;
export const KeyboardEvent = (((typeof window !== 'undefined' && window) as any) || (global as any)).KeyboardEvent as KeyboardEvent;
export const Event = (((typeof window !== 'undefined' && window) as any) || (global as any)).Event as Event;
