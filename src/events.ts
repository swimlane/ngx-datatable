declare let global: any;

export const mouseEvent = (global as any).MouseEvent as MouseEvent;
export const keyboardEvent = (global as any).KeyboardEvent as KeyboardEvent;
