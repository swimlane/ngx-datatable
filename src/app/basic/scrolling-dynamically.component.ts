import { Component } from '@angular/core';
import { ColumnMode } from 'projects/ngx-datatable/src/public-api';

@Component({
  selector: 'scrolling-dynamically-demo',
  template: `
    <div>
      <h3>
        Dynamic Vertical Scrolling
        <small>
          <a
            href="https://github.com/siemens/ngx-datatable/blob/master/src/app/basic/scrolling-dynamically.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        #mydatatable
        class="material"
        [headerHeight]="50"
        [limit]="5"
        [virtualization]="false"
        [scrollbarV]="true"
        [scrollbarVDynamic]="true"
        [columnMode]="ColumnMode.force"
        [footerHeight]="50"
        rowHeight="auto"
        [rows]="rows"
      >
        <ngx-datatable-column name="Name">
          <ng-template ngx-datatable-cell-template let-rowIndex="rowIndex" let-value="value" let-row="row">
            <span
              title="Double click to edit"
              (dblclick)="editing[rowIndex + '-name'] = true"
              *ngIf="!editing[rowIndex + '-name']"
            >
              {{ value }}
            </span>
            <input
              autofocus
              (blur)="updateValue($event, 'name', rowIndex)"
              *ngIf="editing[rowIndex + '-name']"
              type="text"
              [value]="value"
            />
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Gender">
          <ng-template ngx-datatable-cell-template let-rowIndex="rowIndex" let-row="row" let-value="value">
            <span
              title="Double click to edit"
              (dblclick)="editing[rowIndex + '-gender'] = true"
              *ngIf="!editing[rowIndex + '-gender']"
            >
              {{ value }}
            </span>
            <select
              *ngIf="editing[rowIndex + '-gender']"
              (blur)="editing[rowIndex + '-gender'] = false"
              (change)="updateValue($event, 'gender', rowIndex)"
              [value]="value"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Age">
          <ng-template ngx-datatable-cell-template let-value="value">
            {{ value }}
          </ng-template>
        </ngx-datatable-column>
      </ngx-datatable>
    </div>
  `
})
export class ScollingDynamicallyComponent {
  editing = {};
  rows = [];

  ColumnMode = ColumnMode;

  constructor() {
    this.fetch(data => {
      this.rows = data.slice(0, 5);
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

  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }
}
