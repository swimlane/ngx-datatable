import { Component, inject, OnInit, signal } from '@angular/core';
import { DatatableComponent } from 'projects/swimlane/ngx-datatable/src/public-api';

import { Employee } from '../data.model';
import { MockServerResultsService } from './mock-server-results-service';
import { Page } from './model/page';

@Component({
  selector: 'server-paging-demo',
  imports: [DatatableComponent],
  template: `
    <div>
      <h3>
        Server-side Paging
        <small>
          <a
            href="https://github.com/siemens/ngx-datatable/blob/main/src/app/paging/paging-server.component.ts"
            target="_blank"
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
        [columns]="[{ name: 'Name' }, { name: 'Gender' }, { name: 'Company' }]"
        [headerHeight]="50"
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
export class ServerPagingComponent implements OnInit {
  readonly page = signal<Page>({
    pageNumber: 0,
    size: 20,
    totalElements: 0,
    totalPages: 0
  });
  readonly rows = signal<Employee[]>([]);
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
}
