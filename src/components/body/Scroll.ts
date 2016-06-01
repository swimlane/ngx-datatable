import { Component, Input } from '@angular/core';

@Component({
  selector: 'datatable-scroll',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[style.height]': 'count * rowHeight',
    '[style.width]': 'scrollWidth',
    '[class.datatable-scroll]': 'true'
  }
})
export class DataTableScroll {

  @Input() rowHeight: number;
  @Input() count: number;
  @Input() scrollWidth: number;

}
