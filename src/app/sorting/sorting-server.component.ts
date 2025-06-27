import { Component, inject } from '@angular/core';
import {
  ColumnMode,
  DatatableComponent,
  SortEvent,
  TableColumn
} from 'projects/swimlane/ngx-datatable/src/public-api';
import { Employee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'server-sorting-demo',
  template: `
    <div>
      <h3>
        Server-side Sorting
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/sorting/sorting-server.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [rows]="rows"
        [columns]="columns"
        [columnMode]="ColumnMode.force"
        [headerHeight]="50"
        [footerHeight]="50"
        rowHeight="auto"
        [externalSorting]="true"
        [loadingIndicator]="loading"
        (sort)="onSort($event)"
      >
      </ngx-datatable>
    </div>
  `,
  imports: [DatatableComponent]
})
export class ServerSortingComponent {
  loading = false;

  rows: Employee[] = [];

  columns: TableColumn[] = [
    { name: 'Company', sortable: true },
    { name: 'Name', sortable: true },
    { name: 'Gender', sortable: true }
  ];

  ColumnMode = ColumnMode;

  private dataService = inject(DataService);

  constructor() {
    this.dataService.load('company.json').subscribe(data => {
      this.rows = data.splice(0, 20);
    });
  }

  onSort(event: SortEvent) {
    // event was triggered, start sort sequence
    console.log('Sort Event', event);
    this.loading = true;
    // emulate a server request with a timeout
    setTimeout(() => {
      const rows = [...this.rows];
      // this is only for demo purposes, normally
      // your server would return the result for
      // you and you would just set the rows prop
      const sort = event.sorts[0];
      type sortProp = 'company' | 'name' | 'gender';
      rows.sort(
        (a, b) =>
          a[sort.prop as sortProp].localeCompare(b[sort.prop as sortProp]) *
          (sort.dir === 'desc' ? -1 : 1)
      );

      this.rows = rows;
      this.loading = false;
    }, 1000);
  }
}
