import { EventEmitter } from '@angular/core';

export class Scrollbar {
  static widthChange: EventEmitter<number> = new EventEmitter<number>();

  static width: number = 0;

  static setWidth(): void {
    const out = document.createElement('div');
    const ins = document.createElement('div');
    out.style.width = ins.style.width = '100%';
    out.style.overflow = 'scroll';
    document.body.appendChild(out).appendChild(ins);
    const width = out.offsetWidth - ins.offsetWidth;
    out.parentNode.removeChild(out);

    this.widthChange.emit((this.width = width));
  }
}

export const scrollbarInitializer = (): void => {
  Scrollbar.setWidth();
  document.onreadystatechange = () => Scrollbar.setWidth();
};
