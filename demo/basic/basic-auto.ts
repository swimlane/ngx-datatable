import { Component } from '@angular/core';

@Component({
  selector: 'basic-auto-demo',
  template: `
    <div>
      <h3>Fluid Row Heights</h3>
      <datatable
        class="material"
        [rows]="rows"
        [columns]="columns"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="'auto'">
      </datatable>
    </div>
  `
})
export class BasicAutoComponent {

  rows = [];

  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];

  constructor() {
    this.fetch((data) => {
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
