declare let global: any;

import { MouseEvent, KeyboardEvent} from './utils/facade/browser';

export const mouseEvent = (global as any).MouseEvent as MouseEvent;
export const keyboardEvent = (global as any).KeyboardEvent as KeyboardEvent;
