import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef
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
  directives: [ DataTablePager ]
})
export class DataTableFooter {

  @Input() offset;
  @Input() size;
  @Input() count;
  @Output() onPaged = new EventEmitter();

  get visible() {
    return (this.count / this.size) > 1;
  }

  constructor(elm: ElementRef){
    elm.nativeElement.classList.add('datatable-footer');
  }

}
