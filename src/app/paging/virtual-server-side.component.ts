import { Component, inject, signal } from '@angular/core';
import { DatatableComponent, PageEvent } from 'projects/swimlane/ngx-datatable/src/public-api';

import { Employee } from '../data.model';
import { MockServerResultsService } from './mock-server-results-service';
import { Page } from './model/page';

@Component({
  selector: 'virtual-server-side-demo',
  imports: [DatatableComponent],
  template: `
    <div>
      <h3>
        Virtual server-side
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/paging/virtual-server-side.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      @let isLoading = this.isLoading();
      @let totalElements = this.totalElements();
      @let rows = this.rows();
      <ngx-datatable
        class="material"
        columnMode="force"
        [rows]="rows"
        [columns]="[
          { name: 'Name', sortable: false },
          { name: 'Gender', sortable: false },
          { name: 'Company', sortable: false }
        ]"
        [headerHeight]="50"
        [loadingIndicator]="isLoading > 0"
        [ghostLoadingIndicator]="isLoading > 0"
        [scrollbarV]="true"
        [footerHeight]="50"
        [rowHeight]="50"
        [externalPaging]="true"
        [externalSorting]="true"
        [count]="totalElements"
        [offset]="pageNumber"
        (page)="setPage($event)"
      >
        <div loading-indicator class="custom-loading-indicator">loading...</div>
      </ngx-datatable>
    </div>
  `,
  styleUrl: './virtual-server-side.component.scss',
  providers: [MockServerResultsService]
})
export class VirtualServerSideComponent {
  readonly totalElements = signal(0);
  pageNumber = 0;
  readonly rows = signal<Employee[] | undefined>(undefined);
  cache: Record<string, boolean> = {};
  cachePageSize = 0;

  readonly isLoading = signal(0);

  private serverResultsService = inject(MockServerResultsService);

  setPage(pageInfo: PageEvent) {
    // Current page number is determined by last call to setPage
    // This is the page the UI is currently displaying
    // The current page is based on the UI pagesize and scroll position
    // Pagesize can change depending on browser size
    this.pageNumber = pageInfo.offset;

    // Calculate row offset in the UI using pageInfo
    // This is the scroll position in rows
    const rowOffset = pageInfo.offset * pageInfo.pageSize;

    const page: Page = {
      pageNumber: Math.floor(rowOffset / pageInfo.pageSize),
      size: pageInfo.pageSize,
      totalElements: 0,
      totalPages: 0
    };

    // We keep a index of server loaded pages so we don't load same data twice
    // This is based on the server page not the UI
    if (this.cachePageSize !== page.size) {
      this.cachePageSize = page.size;
      this.cache = {};
    }
    if (this.cache[page.pageNumber]) {
      return;
    }
    this.cache[page.pageNumber] = true;

    // Counter of pending API calls
    this.isLoading.update(v => v + 1);

    this.serverResultsService.getResults(page).subscribe(pagedData => {
      // Update total count
      this.totalElements.set(pagedData.page.totalElements);

      // Create array to store data if missing
      // The array should have the correct number of with "holes" for missing data
      const currentRows = this.rows() ?? new Array<Employee>(this.totalElements() || 0);

      // Calc starting row offset
      // This is the position to insert the new data
      const start = pagedData.page.pageNumber * pagedData.page.size;

      // Copy existing data
      const rows = [...currentRows];

      // Insert new rows into correct position
      rows.splice(start, pagedData.page.size, ...pagedData.data);

      // Set rows to our new rows for display
      this.rows.set(rows);

      // Decrement the counter of pending API calls
      this.isLoading.update(v => v - 1);
    });
  }
}
