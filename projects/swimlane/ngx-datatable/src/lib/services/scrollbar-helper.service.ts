import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/**
 * Gets the width of the scrollbar.  Nesc for windows
 * http://stackoverflow.com/a/13382873/888165
 */
@Injectable()
export class ScrollbarHelper {
  width: number = 0;

  constructor(@Inject(DOCUMENT) private document: any) {
    window.onload = this.setWidth;
  }

  private setWidth(): void {
    const out = document.createElement('div');
    const ins = document.createElement('div');
    out.style.width = ins.style.width = '100%';
    out.style.overflow = 'scroll';
    document.body.appendChild(out).appendChild(ins);
    const width = out.offsetWidth - ins.offsetWidth;
    out.parentNode.removeChild(out);

    this.width = width;
  }
}
