import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output, Signal } from '@angular/core';

import { FooterContext, PagerPageEvent } from '../../types/public.types';
import { DatatableFooterDirective } from './footer.directive';
import { DataTablePagerComponent } from './pager.component';

@Component({
  selector: 'datatable-footer',
  imports: [NgClass, NgTemplateOutlet, DataTablePagerComponent],
  template: `
    <div
      class="datatable-footer-inner"
      [ngClass]="{ 'selected-count': selectedMessage() }"
      [style.height.px]="footerHeight()"
    >
      @if (footerTemplate()?.template) {
        <ng-template
          [ngTemplateOutlet]="footerTemplate()!.template!"
          [ngTemplateOutletContext]="templateContext()"
        />
      } @else {
        <div class="page-count">
          @if (selectedMessage()) {
            <span> {{ selectedCount()?.toLocaleString() }} {{ selectedMessage() }} / </span>
          }
          {{ rowCount()?.toLocaleString() }} {{ totalMessage() }}
        </div>
        @if (isVisible()) {
          <datatable-pager
            [pagerLeftArrowIcon]="pagerLeftArrowIcon()"
            [pagerRightArrowIcon]="pagerRightArrowIcon()"
            [pagerPreviousIcon]="pagerPreviousIcon()"
            [pagerNextIcon]="pagerNextIcon()"
            [page]="curPage()"
            [size]="pageSize()"
            [count]="rowCount()"
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
  readonly footerHeight = input.required<number>();
  readonly rowCount = input.required<number>();
  readonly pageSize = input.required<number>();
  readonly offset = input.required<number>();
  readonly pagerLeftArrowIcon = input<string | undefined>();
  readonly pagerRightArrowIcon = input<string | undefined>();
  readonly pagerPreviousIcon = input<string | undefined>();
  readonly pagerNextIcon = input<string | undefined>();
  readonly totalMessage = input.required<string>();
  readonly footerTemplate = input<DatatableFooterDirective | undefined>();

  readonly selectedCount = input(0);
  readonly selectedMessage = input<string | boolean | undefined>(undefined);

  readonly page = output<PagerPageEvent>();

  readonly isVisible = computed(() => this.rowCount() / this.pageSize() > 1);
  readonly curPage = computed(() => this.offset() + 1);
  readonly templateContext: Signal<FooterContext> = computed(() => ({
    rowCount: this.rowCount(),
    pageSize: this.pageSize(),
    selectedCount: this.selectedCount(),
    curPage: this.curPage(),
    offset: this.offset()
  }));
}
