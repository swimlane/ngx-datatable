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
      <h3>sorting: client</h3>
      <datatable
        style="height: 500px"
        class='material'
        [rows]='rows'
        [options]='options'>
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
    rowHeight: 50,
    scrollbarV: true,
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
      let data = JSON.parse(req.response);
      cb(data);
    };

    req.send();
  }

}
