import { Component, inject } from '@angular/core';
import { DatatableComponent, SortPropDir, TableColumn } from '@siemens/ngx-datatable';

import { Employee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'server-sorting-demo',
  imports: [DatatableComponent],
  template: `
    <div>
      <h3>
        Server-side Sorting
        <small>
          <a
            href="https://github.com/siemens/ngx-datatable/blob/main/src/app/sorting/sorting-server.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        rowHeight="auto"
        columnMode="force"
        [rows]="rows"
        [columns]="columns"
        [headerHeight]="50"
        [footerHeight]="50"
        [externalSorting]="true"
        [loadingIndicator]="loading"
        (sortsChange)="onSort($event)"
      />
    </div>
  `
})
export class ServerSortingComponent {
  loading = false;

  rows: Employee[] = [];

  columns: TableColumn[] = [
    { name: 'Company', sortable: true },
    { name: 'Name', sortable: true },
    { name: 'Gender', sortable: true }
  ];

  private dataService = inject(DataService);

  constructor() {
    this.dataService.load('company.json').subscribe(data => {
      this.rows = data.splice(0, 20);
    });
  }

  onSort(event: SortPropDir[]) {
    // event was triggered, start sort sequence
    this.loading = true;
    // emulate a server request with a timeout
    setTimeout(() => {
      const rows = [...this.rows];
      // this is only for demo purposes, normally
      // your server would return the result for
      // you and you would just set the rows prop
      const sort = event[0];
      type SortProp = 'company' | 'name' | 'gender';
      rows.sort(
        (a, b) =>
          a[sort.prop as SortProp].localeCompare(b[sort.prop as SortProp]) *
          (sort.dir === 'desc' ? -1 : 1)
      );

      this.rows = rows;
      this.loading = false;
    }, 1000);
  }
}
