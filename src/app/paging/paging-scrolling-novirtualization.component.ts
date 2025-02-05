import { Component, OnInit } from '@angular/core';
import { MockServerResultsService } from './mock-server-results-service';
import { Page } from './model/page';
import { ColumnMode } from 'projects/swimlane/ngx-datatable/src/public-api';
import { Employee } from '../data.model';

@Component({
  selector: 'paging-scrolling-novirtualization-demo',
  providers: [MockServerResultsService],
  template: `
    <div>
      <h3>
        Server-side Paging
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/paging/paging-scrolling-novirtualization.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [rows]="rows"
        [columns]="[{ name: 'Name' }, { name: 'Gender' }, { name: 'Company' }]"
        [columnMode]="ColumnMode.force"
        [headerHeight]="50"
        [footerHeight]="50"
        rowHeight="auto"
        [scrollbarV]="true"
        [virtualization]="false"
        [externalPaging]="true"
        [count]="page.totalElements"
        [offset]="page.pageNumber"
        [limit]="page.size"
        [ghostLoadingIndicator]="isLoading > 0"
        (page)="setPage($event)"
      >
      </ngx-datatable>
    </div>
  `,
  standalone: false
})
export class PagingScrollingNoVirtualizationComponent implements OnInit {
  page: Page = {
    pageNumber: 0,
    size: 20,
    totalElements: 0,
    totalPages: 0
  };
  rows: Employee[] = [];

  ColumnMode = ColumnMode;
  isLoading = 0;

  constructor(private serverResultsService: MockServerResultsService) {}

  ngOnInit() {
    this.setPage({ offset: 0 });
  }

  /**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */
  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.isLoading++;
    this.serverResultsService.getResults(this.page).subscribe(pagedData => {
      this.isLoading--;
      this.page = pagedData.page;
      this.rows = pagedData.data;
    });
  }
}
