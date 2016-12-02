import {
  Component, Output, EventEmitter, ChangeDetectionStrategy, Input
} from '@angular/core';

@Component({
  selector: 'data-table-footer',
  template: `
    <div
      [style.height.px]="footerHeight">
      <div class="page-count">{{rowCount.toLocaleString()}} {{totalMessage}}</div>
      <data-table-pager
        [pagerLeftArrowIcon]="pagerLeftArrowIcon"
        [pagerRightArrowIcon]="pagerRightArrowIcon"
        [pagerPreviousIcon]="pagerPreviousIcon"
        [pagerNextIcon]="pagerNextIcon"
        [page]="curPage"
        [size]="pageSize"
        [count]="rowCount"
        [hidden]="!isVisible"
        (change)="page.emit($event)">
       </data-table-pager>
     </div>
  `,
  host: {
    class: 'data-table-footer'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableFooterComponent {

  @Input() footerHeight: number;
  @Input() rowCount: number;
  @Input() pageSize: number;
  @Input() offset: number;
  @Input() pagerLeftArrowIcon: string;
  @Input() pagerRightArrowIcon: string;
  @Input() pagerPreviousIcon: string;
  @Input() pagerNextIcon: string;
  @Input() totalMessage: string;

  @Output() page: EventEmitter<any> = new EventEmitter();

  get isVisible() {
    return (this.rowCount / this.pageSize) > 1;
  }

  get curPage() {
    return this.offset + 1;
  }

}
