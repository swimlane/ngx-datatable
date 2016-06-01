import { Component, Input, HostBinding } from '@angular/core';
import { DataTablePager } from './Pager';

@Component({
  selector: 'datatable-footer',
  template: `
    <div class="page-count">{{paging.count}} total</div>
    <datatable-pager
      [page]="page"
      [size]="paging.size"
      [count]="paging.count"
      (onPage)="onPaged(page)"
      [hidden]="paging.count / paging.size">
     </datatable-pager>
  `,
  directives: [ DataTablePager ]
})
export class DataTableFooter {

  @Input() paging;

  private page: number = 1;

  @HostBinding('class.datatable-footer')
  private isFooter = true;

  onPaged(page) {

  }

}
