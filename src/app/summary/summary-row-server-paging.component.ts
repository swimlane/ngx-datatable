import { Component, OnInit } from '@angular/core';
import { DatatableComponent, TableColumn } from 'projects/ngx-datatable/src/public-api';

import { Employee } from '../data.model';
import { MockServerResultsService } from '../paging/mock-server-results-service';
import { Page } from '../paging/model/page';

@Component({
  selector: 'summary-row-server-paging-demo',
  providers: [MockServerResultsService],
  template: `
    <div>
      <h3>
        Server-side paging
        <small>
          <a
            href="https://github.com/siemens/ngx-datatable/blob/main/src/app/summary/summary-row-server-paging.component.ts"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [rows]="rows"
        [columns]="columns"
        [columnMode]="'force'"
        [headerHeight]="50"
        [summaryRow]="true"
        [summaryHeight]="55"
        [footerHeight]="50"
        rowHeight="auto"
        [externalPaging]="true"
        [count]="page.totalElements"
        [offset]="page.pageNumber"
        [limit]="page.size"
        (page)="setPage($event.offset)"
      >
      </ngx-datatable>
    </div>
  `,
  imports: [DatatableComponent]
})
export class SummaryRowServerPagingComponent implements OnInit {
  page: Page = {
    pageNumber: 0,
    size: 20,
    totalPages: 0,
    totalElements: 0
  };
  rows: Employee[] = [];

  columns: TableColumn[] = [
    // NOTE: cells for current page only !
    { name: 'Name', summaryFunc: cells => `${cells.length} total` },
    { name: 'Gender', summaryFunc: () => this.getGenderSummary() },
    { name: 'Company', summaryFunc: () => null }
  ];

  constructor(private serverResultsService: MockServerResultsService) {}

  ngOnInit() {
    this.setPage(0);
  }

  /**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */
  setPage(page: number) {
    this.page.pageNumber = page;
    this.serverResultsService.getResults(this.page).subscribe(pagedData => {
      this.page = pagedData.page;
      this.rows = pagedData.data;
    });
  }

  getGenderSummary(): string {
    // NOTE: there should be logic to get required informations from server
    return '10 males, 10 females';
  }
}
