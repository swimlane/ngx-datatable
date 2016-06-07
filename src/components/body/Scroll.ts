import { Component, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'datatable-scroll',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[style.height]': 'scrollHeight',
    '[style.width]': 'scrollWidth + "px"'
  }
})
export class DataTableScroll {

  @Input() rowHeight: number;
  @Input() count: number;
  @Input() scrollWidth: number;

  get scrollHeight() {
    return (this.count * this.rowHeight) + 'px';
  }

  constructor(elm: ElementRef){
    elm.nativeElement.classList.add('datatable-scroll');
  }

}
