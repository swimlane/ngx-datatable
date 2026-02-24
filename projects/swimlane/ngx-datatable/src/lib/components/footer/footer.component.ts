import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output, Signal } from '@angular/core';

import { FooterContext, PagerPageEvent } from '../../types/public.types';
import { DatatableFooterDirective } from './footer.directive';
import { DatatablePagerComponent } from './pager.component';

@Component({
  selector: 'datatable-footer',
  imports: [NgTemplateOutlet, DatatablePagerComponent],
  template: `
    <div
      class="datatable-footer-inner"
      [class.selected-count]="selectedMessage()"
      [style.height.px]="footerHeight()"
    >
      @let footerTemplate = this.footerTemplate()?.template();
      @if (footerTemplate) {
        <ng-template
          [ngTemplateOutlet]="footerTemplate"
          [ngTemplateOutletContext]="templateContext()"
        />
      } @else {
        <div class="page-count">
          @if (selectedMessage()) {
            <span> {{ selectedCount().toLocaleString() }} {{ selectedMessage() }} / </span>
          }
          {{ rowCount().toLocaleString() }} {{ totalMessage() }}
        </div>
        @if (isVisible()) {
          <ngx-datatable-pager />
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
  readonly groupCount = input.required<number | undefined>();
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

  protected readonly isVisible = computed(() => this.rowCount() / this.pageSize() > 1);
  readonly curPage = computed(() => this.offset() + 1);
  protected readonly templateContext: Signal<FooterContext> = computed(() => ({
    rowCount: this.rowCount(),
    pageSize: this.pageSize(),
    selectedCount: this.selectedCount(),
    curPage: this.curPage(),
    offset: this.offset()
  }));
}
