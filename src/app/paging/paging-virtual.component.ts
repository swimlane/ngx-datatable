import { Component } from '@angular/core';
import { MockServerResultsService } from './mock-server-results-service';
import { CorporateEmployee } from './model/corporate-employee';
import { Page } from './model/page';
import { ColumnMode } from 'projects/swimlane/ngx-datatable/src/public-api';
import { delay } from 'rxjs/operators';

interface PageInfo {
  offset: number;
  pageSize: number;
  limit: number;
  count: number;
}

@Component({
  selector: 'virtual-paging-demo',
  providers: [MockServerResultsService],
  template: `
    <div>
      <h3>
        Virtual Server-side Paging
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/paging/paging-virtual.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [rows]="rows"
        [columns]="[
          { name: 'Name', sortable: false },
          { name: 'Gender', sortable: false },
          { name: 'Company', sortable: false }
        ]"
        [columnMode]="ColumnMode.force"
        [headerHeight]="50"
        [loadingIndicator]="isLoading > 0"
        [scrollbarV]="true"
        [footerHeight]="50"
        [rowHeight]="50"
        [externalPaging]="true"
        [externalSorting]="true"
        [count]="totalElements"
        [offset]="pageNumber"
        (page)="setPage($event)"
      >
      </ngx-datatable>
    </div>
  `
})
export class VirtualPagingComponent {
  totalElements: number;
  pageNumber: number;
  rows: CorporateEmployee[];
  cache: any = {};

  ColumnMode = ColumnMode;

  isLoading = 0;

  constructor(private serverResultsService: MockServerResultsService) {
    this.pageNumber = 0;
  }

  setPage(pageInfo: PageInfo) {
    // Current page number is determined by last call to setPage
    // This is the page the UI is currently displaying
    // The current page is based on the UI pagesize and scroll position
    // Pagesize can change depending on browser size
    this.pageNumber = pageInfo.offset;

    // Calculate row offset in the UI using pageInfo
    // This is the scroll position in rows
    const rowOffset = pageInfo.offset * pageInfo.pageSize;

    // When calling the server, we keep page size fixed
    // This should be the max UI pagesize or larger
    // This is not necessary but helps simplify caching since the UI page size can change
    const page = new Page();
    page.size = 20;
    page.pageNumber = Math.floor(rowOffset / page.size);

    // We keep a index of server loaded pages so we don't load same data twice
    // This is based on the server page not the UI
    if (this.cache[page.pageNumber]) return;
    this.cache[page.pageNumber] = true;

    // Counter of pending API calls
    this.isLoading++;

    this.serverResultsService.getResults(page).subscribe(pagedData => {
      // Update total count
      this.totalElements = pagedData.page.totalElements;

      // Create array to store data if missing
      // The array should have the correct number of with "holes" for missing data
      if (!this.rows) {
        this.rows = new Array<CorporateEmployee>(this.totalElements || 0);
      }

      // Calc starting row offset
      // This is the position to insert the new data
      const start = pagedData.page.pageNumber * pagedData.page.size;

      // Copy existing data
      const rows = [...this.rows];

      // Insert new rows into correct position
      rows.splice(start, pagedData.page.size, ...pagedData.data);

      // Set rows to our new rows for display
      this.rows = rows;

      // Decrement the counter of pending API calls
      this.isLoading--;
    });
  }
}
