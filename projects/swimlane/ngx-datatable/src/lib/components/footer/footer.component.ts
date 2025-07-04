import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { PagerPageEvent } from '../../types/public.types';
import { DatatableFooterDirective } from './footer.directive';
import { DataTablePagerComponent } from './pager.component';
@Component({
  selector: 'datatable-footer',
  imports: [NgClass, NgTemplateOutlet, DataTablePagerComponent],
  template: `
    <div
      class="datatable-footer-inner"
      [ngClass]="{ 'selected-count': selectedMessage }"
      [style.height.px]="footerHeight"
    >
      @if (footerTemplate?.template) {
        <ng-template
          [ngTemplateOutlet]="footerTemplate!.template!"
          [ngTemplateOutletContext]="{
            rowCount: rowCount,
            pageSize: pageSize,
            selectedCount: selectedCount,
            curPage: curPage,
            offset: offset
          }"
        />
      } @else {
        <div class="page-count">
          @if (selectedMessage) {
            <span> {{ selectedCount?.toLocaleString() }} {{ selectedMessage }} / </span>
          }
          {{ rowCount?.toLocaleString() }} {{ totalMessage }}
        </div>
        @if (isVisible) {
          <datatable-pager
            [pagerLeftArrowIcon]="pagerLeftArrowIcon"
            [pagerRightArrowIcon]="pagerRightArrowIcon"
            [pagerPreviousIcon]="pagerPreviousIcon"
            [pagerNextIcon]="pagerNextIcon"
            [page]="curPage"
            [size]="pageSize"
            [count]="rowCount"
            (change)="page.emit($event)"
          />
        }
      }
    </div>
  `,
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'datatable-footer'
  }
})
export class DataTableFooterComponent {
  @Input() footerHeight!: number;
  @Input() rowCount!: number;
  @Input() pageSize!: number;
  @Input() offset!: number;
  @Input() pagerLeftArrowIcon?: string;
  @Input() pagerRightArrowIcon?: string;
  @Input() pagerPreviousIcon?: string;
  @Input() pagerNextIcon?: string;
  @Input() totalMessage!: string;
  @Input() footerTemplate?: DatatableFooterDirective;

  @Input() selectedCount = 0;
  @Input() selectedMessage?: string | boolean;

  @Output() readonly page = new EventEmitter<PagerPageEvent>();

  get isVisible(): boolean {
    return this.rowCount / this.pageSize > 1;
  }

  get curPage(): number {
    return this.offset + 1;
  }
}
