import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef
} from '@angular/core';

import { StateService } from '../../services/State';
import { DataTablePager } from './Pager';

@Component({
  selector: 'datatable-footer',
  template: `
    <div
      *ngIf="state.options.footerHeight"
      [style.height]="state.options.footerHeight">
      <div class="page-count">{{state.pageCount}} total</div>
      <datatable-pager
        [page]="curPage"
        [size]="state.pageSize"
        (onPaged)="onPageChange.emit($event)"
        [count]="state.pageCount"
        [hidden]="!visible">
       </datatable-pager>
     </div>
  `,
  directives: [ DataTablePager ]
})
export class DataTableFooter {

  @Output() onPageChange: EventEmitter = new EventEmitter();

  private state: StateService;

  get visible() {
    return (this.state.pageCount / this.state.pageSize) > 1;
  }

  get curPage() {
    return this.state.options.offset + 1;
  }

  constructor(elm: ElementRef, private state: StateService) {
    elm.nativeElement.classList.add('datatable-footer');
  }

}
