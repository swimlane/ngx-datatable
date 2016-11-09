import { Component } from '@angular/core';

@Component({
  selector: 'inline-edit-demo',
  template: `
    <div>
      <h3>
        Inline Editing
        <small>
          <a href="#" (click)="mydatatable.refresh()">Refresh</a>
        </small>
      </h3>
      <datatable
        #mydatatable
        class="material"
        [headerHeight]="50"
        [limit]="5"
        [columnMode]="'force'"
        [footerHeight]="50"
        [rowHeight]="'auto'"
        [rows]="rows">
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
export class InlineEditComponent {

  editing = {};
  rows = [];

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

  updateValue(event, cell, cellValue, row) {
    this.editing[row.$$index] = false;
    this.rows[row.$$index][cell] = event.target.value;
  }

}
