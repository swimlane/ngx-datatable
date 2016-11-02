import { Component } from '@angular/core';

@Component({
  selector: 'client-sorting-demo',
  template: `
    <div>
      <h3>Client-side Sorting</h3>
      <datatable
        class="material"
        [rows]="rows"
        [columns]="columns"
        [sortType]="'multi'"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="50"
        [scrollbarV]="true">
      </datatable>
    </div>
  `
})
export class ClientSortingComponent {

  rows = [];

  columns = [
    { name: 'Company' },
    { name: 'Name' },
    { name: 'Gender' }
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
      let data = JSON.parse(req.response);
      cb(data);
    };

    req.send();
  }

}
