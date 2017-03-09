import { Component } from '@angular/core';

@Component({
  selector: 'server-paging-demo',
  template: `
    <div>
      <h3>
        Server-side Paging
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/paging/paging-server.ts" target="_blank">
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
        [footerHeight]="50"
        [rowHeight]="'auto'"
        [externalPaging]="true"
        [count]="count"
        [offset]="offset"
        [limit]="limit"
        (page)='onPage($event)'>
      </ngx-datatable>
    </div>
  `
})
export class ServerPagingComponent {

  rows = [];
  count: number = 0;
  offset: number = 0;
  limit: number = 10;

  ngOnInit() {
    this.page(this.offset, this.limit);
  }

  page(offset, limit) {
    this.fetch((results) => {
      this.count = results.length;

      const start = offset * limit;
      const end = start + limit;
      const rows = [...this.rows];

      for (let i = start; i < end; i++) {
        rows[i] = results[i];
      }

      this.rows = rows;
      console.log('Page Results', start, end, rows);
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  onPage(event) {
    console.log('Page Event', event);
    this.page(event.offset, event.limit);
  }

}
