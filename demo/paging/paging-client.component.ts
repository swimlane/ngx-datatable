import { Component } from '@angular/core';

@Component({
  selector: 'client-paging-demo',
  template: `
    <div>
      <h3>
        Client-side Paging
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/paging/paging-client.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [rows]="rows"
        [columns]="columns"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="'auto'"
        [limit]="10">
      </ngx-datatable>
    </div>
  `
})
export class ClientPagingComponent {

  rows = [];
  columns = [];

  constructor() {
    this.fetch((data) => {
      this.rows = [
        {
          "name": "Ethel Price",
          "gender": "female",
          "company": "Johnson, Johnson and Partners, LLC CMP DDC",
          "age": 22
        }
      ];
    });
    this.columns = [{prop:'name'},{prop:'gender'},{prop:'Company'}];
    console.log(this.columns);
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}
