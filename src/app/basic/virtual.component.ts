import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ColumnMode } from 'projects/swimlane/ngx-datatable/src/public-api';

@Component({
  selector: 'virtual-scroll-demo',
  template: `
    <div>
      <h3>
        Virtual Scrolling with 1 million Rows
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/virtual.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [rows]="rows"
        [count]="totalRows"
        [externalPaging]="true"
        [virtualization]="true"
        [columnMode]="ColumnMode.force"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="50"
        [scrollbarV]="true"
        [limit]="page.limit"
        (page)="onPage($event)"
      >
        <ngx-datatable-column name="Name" [width]="300"></ngx-datatable-column>
        <ngx-datatable-column name="Gender"></ngx-datatable-column>
        <ngx-datatable-column name="Age"></ngx-datatable-column>
        <ngx-datatable-column name="City" [width]="300" prop="address.city"></ngx-datatable-column>
        <ngx-datatable-column
          name="State"
          [width]="300"
          prop="address.state"
        ></ngx-datatable-column>
      </ngx-datatable>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class VirtualScrollComponent {
  rows: any[];
  fetchedRows: any[];
  expanded = {};
  timeout: any;
  totalRows = 1000000; // Total number of rows
  page = {
    count: 1000000,
    pageSize: 12,
    limit: 12,
    offset: 0
  };
  ColumnMode = ColumnMode;

  constructor(private readonly cdr: ChangeDetectorRef) {
    this.fetch(data => {
      const unfetchedRows = [];
      for (let i = 0; i < 10000000 - 12; i++) {
        // Simulate fetching only the first 1000 rows initially
        unfetchedRows.push({});
      }
      this.fetchedRows = data;
      this.rows = [...this.fetchedRows.slice(0, 12)]; // Initial load of 1000 rows
      this.totalRows = this.fetchedRows.length; // Update total rows
      this.cdr.detectChanges();
    });
  }

  onPage(event) {
    const start = event.offset * event.limit;
    if (start > 0) {
      console.log('start', start, event);
      const newRows = this.fetchedRows.slice(start, start + event.limit);
      this.rows.splice(start, newRows.length, ...newRows);
      console.log(this.rows);
      this.page.offset = event.offset;
      console.log('rows', newRows);
      this.cdr.detectChanges();
    }
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/1m.json`);

    req.onload = () => {
      const rows = JSON.parse(req.response);

      for (const row of rows) {
        row.height = Math.floor(Math.random() * 80) + 50;
      }

      cb(rows);
    };

    req.send();
  }

  getRowHeight(row) {
    return row.height;
  }
}
