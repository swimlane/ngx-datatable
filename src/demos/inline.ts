import { Component } from '@angular/core';

import { TableOptions } from '../angular2-data-table';
import '../themes/material.scss';

@Component({
  selector: 'app',
  template: `
    <div>
      <h3>inline editing</h3>
      <datatable
        class='material'
        [rows]='rows'
        [options]='options'>
        <datatable-column name="Name">
          <template let-value="value" let-row="row">
            <span
              title="Double click to edit"
              (dblclick)="editing[row.$$index] = true"
              *ngIf="!editing[row.$$index]">
              {{value}}
            </span>
            <input
              autofocus
              (blur)="updateValue($event, 'name', value, row)"
              *ngIf="editing[row.$$index]"
              type="text"
              [value]="value"
            />
          </template>
        </datatable-column>
        <datatable-column name="Gender">
          <template let-row="row" let-value="value">
            {{value}}
          </template>
        </datatable-column>
        <datatable-column name="Age">
          <template let-value="value">
            {{value}}
          </template>
        </datatable-column>
      </datatable>
    </div>
  `
})
export class App {

  editing = {};

  rows = [];

  options = new TableOptions({
    headerHeight: 50,
    columnMode: 'force',
    footerHeight: 50,
    rowHeight: 'auto'
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

  updateValue(event, cell, cellValue, row) {
    this.editing[row.$$index] = false;
    this.rows[row.$$index][cell] = event.target.value;
  }

}
