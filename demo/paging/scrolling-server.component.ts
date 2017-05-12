import { Component } from '@angular/core';
import {MockServerResultsService} from "./mock-server-results-service";
import {PagedData} from "./model/paged-data";
import {CorporateEmployee} from "./model/corporate-employee";
import {Page} from "./model/page";

@Component({
  selector: 'server-scrolling-demo',
  providers: [
      MockServerResultsService
  ],
  template: `
    <div>
      <h3>
        Server-side Scrolling
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/paging/server-scrolling.component.ts" target="_blank">
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
        [footerHeight]="0"
        [rowHeight]="50"
        [scrollbarV]="true"
        (page)='onPage($event.offset)'>
      </ngx-datatable>
    </div>
  `
})
export class ServerScrollingComponent {
  
  lastPage = new Page();
  rows = new Array<CorporateEmployee>();

  constructor(private serverResultsService: MockServerResultsService) {
    this.lastPage.pageNumber = -1;
    this.lastPage.size = 5;
  }

  ngOnInit() {
    this.addPage(0);
    this.addPage(1);
  }
  
  onPage(pageNumber: number) {
    // pre-fetch the next page
    if (this.lastPage.pageNumber === pageNumber) {
      this.addPage(pageNumber + 1);
    }
  }

  /**
   * Populate the table with new data based on the page number
   * @param pageNumber The page number to add
   */
  addPage(pageNumber: number){
    // cache the new page, but only once
    if (this.lastPage.pageNumber < pageNumber) {
      this.lastPage.pageNumber++;
      this.serverResultsService.getResults(this.lastPage).subscribe(pagedData => {
        this.lastPage = pagedData.page;
        this.rows = this.rows.concat(pagedData.data);
      });
    }
  }
}
