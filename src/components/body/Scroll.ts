import { Component, Input, HostBinding } from '@angular/core';

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

  @HostBinding('class.datatable-scroll')
  private isScroller = true;

}
