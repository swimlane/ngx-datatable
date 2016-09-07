import {
    Component,
    Output,
    EventEmitter,
    ElementRef,
    Input
} from '@angular/core';

import { StateService } from '../../services/State';

@Component({
  selector: 'datatable-footer',
  template: `
    <div
      *ngIf="state.getOption(key,'footerHeight')"
      [style.height]="state.getOption(key,'footerHeight')">
      <div class="page-count">{{state.rowCount(key)}} total</div>
      <datatable-pager
        [page]="curPage"
        [size]="state.pageSize(key)"
        (onPaged)="onPageChange.emit($event)"
        [count]="state.rowCount(key)"
        [hidden]="!visible">
       </datatable-pager>
     </div>
  `
})
export class DataTableFooter {

  @Input() key: string;
  @Output() onPageChange: EventEmitter<any> = new EventEmitter();

  get visible() {
    return (this.state.rowCount(this.key) / this.state.pageSize(this.key)) > 1;
  }

  get curPage() {
    return this.state.getOption(this.key, 'offset') + 1;
  }

  constructor(elm: ElementRef, private state: StateService) {
    elm.nativeElement.classList.add('datatable-footer');
  }

}
