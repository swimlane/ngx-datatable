import { Component, inject, OnInit, signal } from '@angular/core';
import { DatatableComponent } from 'projects/swimlane/ngx-datatable/src/public-api';

import { Employee } from '../data.model';
import { MockServerResultsService } from './mock-server-results-service';
import { Page } from './model/page';

@Component({
  selector: 'server-side-paging-demo',
  imports: [DatatableComponent],
  template: `
    <div>
      <h3>
        Server-side Paging
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/paging/server-side-paging.component.ts"
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
        [loadingIndicator]="loading()"
        (page)="setPage($event.offset)"
      />
    </div>
  `,
  providers: [MockServerResultsService]
})
export class ServerSidePagingComponent implements OnInit {
  readonly page = signal<Page>({
    pageNumber: 0,
    size: 20,
    totalElements: 0,
    totalPages: 0
  });
  readonly rows = signal<Employee[]>([]);
  readonly loading = signal(false);
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
    this.loading.set(true);
    this.serverResultsService.getResults(this.page()).subscribe(pagedData => {
      this.page.set(pagedData.page);
      this.rows.set(pagedData.data);
      this.loading.set(false);
    });
  }
}
