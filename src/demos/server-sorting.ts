import { Component } from '@angular/core';

import {
  TableOptions,
  TableColumn,
  ColumnMode
} from '../angular2-data-table';
import '../themes/material.scss';

@Component({
  selector: 'app',
  template: `
    <div>
      <h3>server-sorting</h3>
      <datatable
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
    rowHeight: 'auto',
    columns: [
      new TableColumn({ name: 'Name' }),
      new TableColumn({ name: 'Gender' }),
      new TableColumn({ name: 'Company', comparator: this.sorter.bind(this) })
    ]
  });

  constructor() {
    this.fetch((data) => {
      this.rows.push(...data);
    });
  }

  sorter(rows, dirs) {
    console.log('sorting started!');
    setTimeout(() => {
      this.rows.reverse();
      console.log('sorted!');
    }, 500);
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      let data = JSON.parse(req.response);
      cb(data.splice(0, 20));
    };

    req.send();
  }

}
