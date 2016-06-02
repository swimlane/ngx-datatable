import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { DataTablePager } from './Pager';

@Component({
  selector: 'datatable-footer',
  template: `
    <div class="page-count">{{count}} total</div>
    <datatable-pager
      [page]="offset + 1"
      [size]="size"
      [count]="count"
      (onPaged)="onPaged.emit($event)"
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
  @Output() onPaged = new EventEmitter();

  get visible() {
    return (this.count / this.size) > 1;
  }

}
