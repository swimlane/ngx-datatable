import { Component } from '@angular/core';
import {MockServerResultsService} from "./mock-server-results-service";
import {PagedData} from "./model/paged-data";
import {CorporateEmployee} from "./model/corporate-employee";
import {Page} from "./model/page";

@Component({
  selector: 'virtual-paging-demo',
  providers: [
      MockServerResultsService
  ],
  template: `
    <div>
      <h3>
        Virtual Server-side Paging
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/paging/paging-virtual.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [rows]="rows"
        [columns]="[{name:'Name'},{name:'Gender'},{name:'Company'}]"
        [columnMode]="'force'"
        [headerHeight]="50"
        [scrollbarV]="true"
        [footerHeight]="50"
        [rowHeight]="50"
        [externalPaging]="true"
        [count]="page.totalElements"
        [offset]="page.pageNumber"
        (page)='setPage($event)'>
      </ngx-datatable>
    </div>
  `
})
export class VirualPagingComponent {

  page = new Page();
  rows = new Array<CorporateEmployee>();
  cache: any = {};

  constructor(private serverResultsService: MockServerResultsService) {
    this.page.pageNumber = 0;
  }

  /**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */
  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.page.size = pageInfo.pageSize;

    // cache results
    // if(this.cache[this.page.pageNumber]) return;

    this.serverResultsService.getResults(this.page).subscribe(pagedData => {
      this.page = pagedData.page;

      // calc start
      const start = this.page.pageNumber * this.page.size;

      // copy rows
      const rows = [...this.rows];

      // insert rows into new position
      rows.splice(start, 0, ...pagedData.data);

      // set rows to our new rows
      this.rows = rows;

      // add flag for results
      this.cache[this.page.pageNumber] = true;
    });
  }

}
