import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { Page } from '../../types/internal.types';
import { DATATABLE_COMPONENT_TOKEN } from '../../utils/table-token';
import { DatatableComponent } from '../datatable.component';

/**
 * Use this component to construct custom table footer with standard pagination.
 *
 * It must be used inside the `ngx-datatable-footer`
 *
 * @example
 * ```html
 *
 * <ngx-datatable>
 *   ...
 *   <ngx-datatable-footer>
 *     <ng-template>
 *        <app-custom-content />
 *        <ngx-datatable-pager />
 *     </ng-template>
 *   </ngx-datatable-footer>
 * </ngx-datatable>
 * ```
 */
@Component({
  selector: 'ngx-datatable-pager',
  template: `
    <ul class="pager">
      <li [class.disabled]="!canPrevious()">
        <a
          tabindex="0"
          role="button"
          [attr.aria-label]="messages.ariaFirstPageMessage ?? 'go to first page'"
          (click)="selectPage(1)"
        >
          <i [class]="pagerPreviousIcon() ?? 'datatable-icon-prev'"></i>
        </a>
      </li>
      <li [class.disabled]="!canPrevious()">
        <a
          tabindex="0"
          role="button"
          [attr.aria-label]="messages.ariaPreviousPageMessage ?? 'go to previous page'"
          (click)="prevPage()"
        >
          <i [class]="pagerLeftArrowIcon() ?? 'datatable-icon-left'"></i>
        </a>
      </li>
      @for (pg of pages(); track pg.number) {
        <li
          class="pages"
          [attr.aria-label]="(messages.ariaPageNMessage ?? 'page') + ' ' + pg.number"
          [class.active]="pg.number === page()"
        >
          <a tabindex="0" role="button" (click)="selectPage(pg.number)">
            {{ pg.text }}
          </a>
        </li>
      }
      <li [class.disabled]="!canNext()">
        <a
          tabindex="0"
          role="button"
          [attr.aria-label]="messages.ariaNextPageMessage ?? 'go to next page'"
          (click)="nextPage()"
        >
          <i [class]="pagerRightArrowIcon() ?? 'datatable-icon-right'"></i>
        </a>
      </li>
      <li [class.disabled]="!canNext()">
        <a
          tabindex="0"
          role="button"
          [attr.aria-label]="messages.ariaLastPageMessage ?? 'go to last page'"
          (click)="selectPage(totalPages())"
        >
          <i [class]="pagerNextIcon() ?? 'datatable-icon-skip'"></i>
        </a>
      </li>
    </ul>
  `,
  styleUrl: './pager.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'datatable-pager'
  }
})
export class DatatablePagerComponent {
  // We cannot inject the footer directly as it is not part of the injector when used in a template.
  // But the table always is.
  // Ideally we can one day fetch those attributes from a global state, but for now this is fine.
  private datatable = inject(DATATABLE_COMPONENT_TOKEN);

  protected get messages(): DatatableComponent['messages'] {
    return this.datatable?.messages ?? {};
  }

  protected readonly page = computed(() => this.datatable._footerComponent()!.curPage());
  protected readonly pageSize = computed(() => this.datatable._footerComponent()!.pageSize());
  protected readonly count = computed(() => this.datatable._footerComponent()!.rowCount());
  protected readonly pagerNextIcon = computed(() =>
    this.datatable._footerComponent()!.pagerNextIcon()
  );
  protected readonly pagerRightArrowIcon = computed(() =>
    this.datatable._footerComponent()!.pagerRightArrowIcon()
  );
  protected readonly pagerLeftArrowIcon = computed(() =>
    this.datatable._footerComponent()!.pagerLeftArrowIcon()
  );
  protected readonly pagerPreviousIcon = computed(() =>
    this.datatable._footerComponent()!.pagerPreviousIcon()
  );

  protected readonly totalPages = computed(() => {
    return Math.max((this.pageSize() < 1 ? 1 : Math.ceil(this.count() / this.pageSize())) || 0, 1);
  });

  protected readonly pages = computed(() => {
    const pages: Page[] = [];
    let startPage = 1;
    let endPage = this.totalPages();
    const maxSize = 5;
    const isMaxSized = maxSize < this.totalPages();

    const page = this.page();

    if (isMaxSized) {
      startPage = page - Math.floor(maxSize / 2);
      endPage = page + Math.floor(maxSize / 2);

      if (startPage < 1) {
        startPage = 1;
        endPage = Math.min(startPage + maxSize - 1, this.totalPages());
      } else if (endPage > this.totalPages()) {
        startPage = Math.max(this.totalPages() - maxSize + 1, 1);
        endPage = this.totalPages();
      }
    }

    for (let num = startPage; num <= endPage; num++) {
      pages.push({
        number: num,
        text: num.toString()
      });
    }

    return pages;
  });

  protected readonly canPrevious = computed(() => this.page() > 1);

  protected readonly canNext = computed(() => this.page() < this.totalPages());

  protected prevPage(): void {
    this.selectPage(this.page() - 1);
  }

  protected nextPage(): void {
    this.selectPage(this.page() + 1);
  }

  protected selectPage(page: number): void {
    if (page > 0 && page <= this.totalPages() && page !== this.page()) {
      this.datatable._footerComponent()!.page.emit({ page });
    }
  }
}
