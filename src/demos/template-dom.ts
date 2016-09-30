import { Component } from '@angular/core';

import {
  TableOptions,
  ColumnMode
} from '../index';
import '../themes/material.scss';

@Component({
  selector: 'app',
  template: `
    <div>
      <h3>expressive</h3>
      <datatable
        class="material"
        [rows]="rows"
        [options]="options">
        <datatable-column name="Name">
          <template let-model="model">
            Holla! {{model.name}}
          </template>
          <template let-value="value">
            Hi: <strong>{{value}}</strong>
          </template>
        </datatable-column>
        <datatable-column name="Gender">
          <template let-row="row" let-value="value">
            My name is: <i [innerHTML]="row['name']"></i> and <i>{{value}}</i>
            <div>{{joke}}</div>
          </template>
        </datatable-column>
        <datatable-column name="Age">
          <template let-value="value">
            <div style="border:solid 1px #ddd;margin:5px;padding:3px">
              <div style="background:#999;height:10px" [style.width]="value + '%'"></div>
            </div>
          </template>
        </datatable-column>
      </datatable>
    </div>
  `
})
export class App {

  rows = [];
  joke = 'knock knock';

  options = new TableOptions({
    columnMode: ColumnMode.force,
    headerHeight: 50,
    footerHeight: 50,
    rowHeight: 'auto'
  });

  constructor() {
    this.fetch((data) => {
      this.rows.push(...data.splice(0, 5));
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
