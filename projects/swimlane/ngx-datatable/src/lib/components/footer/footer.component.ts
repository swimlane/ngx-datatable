import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DatatableFooterDirective } from './footer.directive';
import { PagerPageEvent } from '../../types/public.types';
import { DataTablePagerComponent } from './pager.component';
import { NgClass, NgTemplateOutlet } from '@angular/common';
@Component({
  selector: 'datatable-footer',
  template: `
    <div
      class="datatable-footer-inner"
      [ngClass]="{ 'selected-count': selectedMessage }"
      [style.height.px]="footerHeight"
    >
      @if (footerTemplate) {
      <ng-template
        [ngTemplateOutlet]="footerTemplate.template"
        [ngTemplateOutletContext]="{
          rowCount: rowCount,
          pageSize: pageSize,
          selectedCount: selectedCount,
          curPage: curPage,
          offset: offset
        }"
      >
      </ng-template>
      } @else {
      <div class="page-count">
        @if (selectedMessage) {
        <span> {{ selectedCount?.toLocaleString() }} {{ selectedMessage }} / </span>
        }
        {{ rowCount?.toLocaleString() }} {{ totalMessage }}
      </div>
      <datatable-pager
        [pagerLeftArrowIcon]="pagerLeftArrowIcon"
        [pagerRightArrowIcon]="pagerRightArrowIcon"
        [pagerPreviousIcon]="pagerPreviousIcon"
        [pagerNextIcon]="pagerNextIcon"
        [page]="curPage"
        [size]="pageSize"
        [count]="rowCount"
        [hidden]="!isVisible"
        (change)="page.emit($event)"
      >
      </datatable-pager>
      }
    </div>
  `,
  host: {
    class: 'datatable-footer'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, NgTemplateOutlet, DataTablePagerComponent]
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
  @Input() footerTemplate: DatatableFooterDirective;

  @Input() selectedCount: number = 0;
  @Input() selectedMessage: string | boolean;

  @Output() page: EventEmitter<PagerPageEvent> = new EventEmitter();

  get isVisible(): boolean {
    return this.rowCount / this.pageSize > 1;
  }

  get curPage(): number {
    return this.offset + 1;
  }
}
