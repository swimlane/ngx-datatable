import {
  Component,
  Output,
  EventEmitter,
  ElementRef
} from '@angular/core';

import { StateService } from '../../services/State';

@Component({
  selector: 'datatable-footer',
  template: `
    <div
      *ngIf="state.options.footerHeight"
      [style.height]="state.options.footerHeight">
      <div class="page-count">{{state.rowCount}} total</div>
      <datatable-pager
        [page]="curPage"
        [size]="state.pageSize"
        (onPaged)="onPageChange.emit($event)"
        [count]="state.rowCount"
        [hidden]="!visible">
       </datatable-pager>
     </div>
  `
})
export class DataTableFooter {

  @Output() onPageChange: EventEmitter<any> = new EventEmitter();

  get visible() {
    return (this.state.rowCount / this.state.pageSize) > 1;
  }

  get curPage() {
    return this.state.options.offset + 1;
  }

  constructor(elm: ElementRef, private state: StateService) {
    elm.nativeElement.classList.add('datatable-footer');
  }

}
