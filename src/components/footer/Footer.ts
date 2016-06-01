import { Component, Input } from '@angular/core';
import { DataTablePager } from './Pager';

@Component({
  selector: 'datatable-footer',
  template: `
    <div class="page-count">{{count}} total</div>
    <datatable-pager
      [page]="offset + 1"
      [size]="size"
      [count]="count"
      (onPage)="onPaged(page)"
      [hidden]="!visible">
     </datatable-pager>
  `,
  directives: [ DataTablePager ],
  host: {
    '[class.datatable-footer]': 'true'
  }
})
export class DataTableFooter {

  @Input() offset;
  @Input() size;
  @Input() count;

  get visible() {
    return (this.count / this.size) > 1;
  }

  onPaged(page) {}

}
