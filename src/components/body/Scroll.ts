import { Component, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'datatable-scroll',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[style.height]': 'scrollHeight',
    '[style.width]': 'scrollWidth'
  }
})
export class DataTableScroll {

  @Input() rowHeight: number;
  @Input() count: number;
  @Input() scrollWidth: number;

  get scrollHeight() {
    return this.count * this.rowHeight;
  }

  constructor(elm: ElementRef){
    elm.nativeElement.classList.add('datatable-scroll');
  }

}
