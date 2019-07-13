import { Component } from '@angular/core';

@Component({
  selector: 'reusability-demo',
  template: `
    <div>
      <h3>
        Reusability
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/demo/basic/reusability/reusability.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <reusable-table [columns]="columns" [rows]="rows">
        <ngx-datatable-column name="Gender"></ngx-datatable-column>
      </reusable-table>
      <br />
      <reusable-table [columns]="columns" [rows]="rows">
        <ngx-datatable-column name="Gender"></ngx-datatable-column>
        <ngx-datatable-column
          name="Company"
          [initialOrder]="0"
        ></ngx-datatable-column>
      </reusable-table>
    </div>
  `
})
export class ReusabilityComponent {
  rows = [];

  columns = [{ prop: 'name' }, { name: 'Gender' }, { name: 'Company' }];

  constructor() {
    this.fetch(data => {
      this.rows = data;
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
}
