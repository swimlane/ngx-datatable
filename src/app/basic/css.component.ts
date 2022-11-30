import { Component } from '@angular/core';
import { ColumnMode } from 'projects/swimlane/ngx-datatable/src/public-api';
import { GenderPipe } from '../pipes/gender.pipe';

@Component({
  selector: 'row-css-demo',
  template: `
    <div>
      <h3>
        Row/Header/Cell CSS Class Demo
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/css.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [rows]="rows"
        [columnMode]="ColumnMode.force"
        [headerHeight]="50"
        [rowHeight]="50"
        [rowClass]="getRowClass"
        [scrollbarV]="true"
      >
        <ngx-datatable-column name="Name"></ngx-datatable-column>
        <ngx-datatable-column
          name="Gender"
          [titlePipe]="genderPipe"
          headerClass="is-gender"
          [cellClass]="getCellClass"
        ></ngx-datatable-column>
        <ngx-datatable-column name="Age"></ngx-datatable-column>
      </ngx-datatable>
    </div>
  `
})
export class RowCssComponent {
  rows = [];
  expanded = {};
  timeout: any;
  genderPipe = new GenderPipe();

  ColumnMode = ColumnMode;

  constructor() {
    this.fetch(data => {
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      const rows = JSON.parse(req.response);
      cb(rows.splice(0, 50));
    };

    req.send();
  }

  getRowClass(row) {
    return {
      'age-is-ten': row.age % 10 === 0
    };
  }

  getCellClass({ row, column, value }): any {
    return {
      'is-female': value === 'female'
    };
  }
}
