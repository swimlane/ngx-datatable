import { Component } from '@angular/core';

import {
  TableOptions,
  TableColumn,
  ColumnMode
} from '../index';
import '../themes/material.scss';

@Component({
  selector: 'app',
  template: `
    <div>
      <h3>client-paging</h3>
      <datatable
        class="material"
        [rows]="rows"
        [options]="options">
      </datatable>
    </div>
  `
})
export class App {

  rows = [];

  options = new TableOptions({
    columnMode: ColumnMode.force,
    headerHeight: 50,
    footerHeight: 50,
    rowHeight: 'auto',
    limit: 10,
    columns: [
      new TableColumn({ name: 'Name' }),
      new TableColumn({ name: 'Gender' }),
      new TableColumn({ name: 'Company' })
    ]
  });

  constructor() {
    this.fetch((data) => {
      this.rows.push(...data);
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
