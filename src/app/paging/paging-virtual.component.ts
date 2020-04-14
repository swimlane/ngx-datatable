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
    // current page number is determined by last call to setPage
    this.pageNumber = pageInfo.offset;

    // don't load same data twice
    if (this.cache[pageInfo.offset]) return;
    this.cache[pageInfo.offset] = true;

    // counter of pages loading
    this.isLoading++;

    // class to idendify loading page
    const page = new Page();
    page.pageNumber = pageInfo.offset;
    page.size = pageInfo.pageSize;

    this.serverResultsService
      .getResults(page)
      .pipe(delay(new Date(Date.now() + 1000 * Math.random()))) // simulating variability in returned data
      .subscribe(pagedData => {
        // update total count
        this.totalElements = pagedData.page.totalElements;

        // create array to store data if missing
        if (!this.rows) {
          // length should be total count
          this.rows = new Array<CorporateEmployee>(pagedData.page.totalElements || 0);
        }

        // calc starting index
        const start = pagedData.page.pageNumber * pagedData.page.size;

        // copy existing data
        const rows = [...this.rows];

        // insert new rows into new position
        rows.splice(start, pagedData.page.size, ...pagedData.data);

        // set rows to our new rows
        this.rows = rows;

        this.isLoading--;
      });
  }
}
