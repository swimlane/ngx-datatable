import { Component, inject, OnInit, signal } from '@angular/core';
import { DatatableComponent, TableColumn } from 'projects/swimlane/ngx-datatable/src/public-api';

import { Employee } from '../data.model';
import { MockServerResultsService } from '../paging/mock-server-results-service';
import { Page } from '../paging/model/page';

@Component({
  selector: 'server-side-paging-summary-demo',
  imports: [DatatableComponent],
  template: `
    <div>
      <h3>
        Server-side Paging Summary
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/summary/server-side-paging-summary.component.ts"
          >
            Source
          </a>
        </small>
      </h3>
      @let page = this.page();
      <ngx-datatable
        class="material"
        rowHeight="auto"
        columnMode="force"
        [rows]="rows()"
        [columns]="columns"
        [headerHeight]="50"
        [summaryRow]="true"
        [summaryHeight]="55"
        [footerHeight]="50"
        [externalPaging]="true"
        [count]="page.totalElements"
        [offset]="page.pageNumber"
        [limit]="page.size"
        (page)="setPage($event.offset)"
      />
    </div>
  `,
  providers: [MockServerResultsService]
})
export class ServerSidePagingSummaryComponent implements OnInit {
  readonly page = signal<Page>({
    pageNumber: 0,
    size: 20,
    totalPages: 0,
    totalElements: 0
  });
  readonly rows = signal<Employee[]>([]);

  columns: TableColumn[] = [
    // NOTE: cells for current page only !
    { name: 'Name', summaryFunc: cells => `${cells.length} total` },
    { name: 'Gender', summaryFunc: () => this.getGenderSummary() },
    { name: 'Company', summaryFunc: () => null }
  ];

  private serverResultsService = inject(MockServerResultsService);

  ngOnInit() {
    this.setPage(0);
  }

  /**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */
  setPage(page: number) {
    this.page.update(currentPage => ({ ...currentPage, pageNumber: page }));
    this.serverResultsService.getResults(this.page()).subscribe(pagedData => {
      this.page.set(pagedData.page);
      this.rows.set(pagedData.data);
    });
  }

  getGenderSummary(): string {
    // NOTE: there should be logic to get required informations from server
    return '10 males, 10 females';
  }
}
