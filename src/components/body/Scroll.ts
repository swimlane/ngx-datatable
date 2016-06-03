import { Component, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'datatable-scroll',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[style.height]': 'count * rowHeight',
    '[style.width]': 'scrollWidth'
  }
})
export class DataTableScroll {

  @Input() rowHeight: number;
  @Input() count: number;
  @Input() scrollWidth: number;

  constructor(elm: ElementRef){
    elm.nativeElement.classList.add('datatable-scroll');
  }

}
