import {
  Component, Output, EventEmitter, ElementRef,
  Renderer, ChangeDetectionStrategy, Input
} from '@angular/core';

@Component({
  selector: 'datatable-footer',
  template: `
    <div
      [style.height.px]="footerHeight">
      <div class="page-count">{{rowCount.toLocaleString()}} {{totalMessage}}</div>
      <datatable-pager
        [pagerLeftArrowIcon]="pagerLeftArrowIcon"
        [pagerRightArrowIcon]="pagerRightArrowIcon"
        [pagerPreviousIcon]="pagerPreviousIcon"
        [pagerNextIcon]="pagerNextIcon"
        [page]="curPage"
        [size]="pageSize"
        [count]="rowCount"
        [hidden]="!isVisible"
        (change)="page.emit($event)">
       </datatable-pager>
     </div>
  `,
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

  constructor(element: ElementRef, renderer: Renderer) {
    renderer.setElementClass(element.nativeElement, 'datatable-footer', true);
  }

}
