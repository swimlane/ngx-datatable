import { Component } from '@angular/core';

@Component({
  selector: 'summary-row-demo',
  template: `
    <div>
      <h3>
        Summary Row
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/basic/basic-fixed.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material striped"
        [rows]="rows"
        [summaryRow]="summaryRow"
        [summaryRowHeight]="50"
        [columns]="columns"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="50">
      </ngx-datatable>
    </div>
  `
})
export class SummaryRowComponent {

  rows = [];
  summaryRow: {
    name: {} | '',
    company: {} | '',
    gender: {} | '',
    age: {} | ''
  };
  columns = [
    { prop: 'name' },
    { name: 'Company' },
    { name: 'Gender' }
  ];

  constructor() {
    this.fetch((data) => {
      this.rows = data;
      this.summaryRow = {
        name: {label: 'Name:', value: ' John'},
        company: 'This Company',
        gender: {label: 'Gender:', value: ' male'},
        age: {label: 'Age:', value: ' 20'}
      };
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
