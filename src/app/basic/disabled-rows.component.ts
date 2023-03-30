import { Component } from '@angular/core';
import { ColumnMode, SelectionType } from 'projects/ngx-datatable/src/public-api';

@Component({
  selector: 'disabled-rows-demo',
  template: `
    <div>
      <h3>
        Disable Row
        <small>
          <a
            href="https://github.com/siemens/ngx-datatable/blob/master/src/app/basic/disabled-rows.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <div>
        <ngx-datatable
          class="material"
          [rows]="rows"
          columnMode="force"
          [headerHeight]="50"
          [footerHeight]="0"
          [rowHeight]="80"
          [scrollbarV]="true"
          [disableRowCheck]="isRowDisabled"
        >
          <ngx-datatable-column  name="Name">
            <ng-template let-value="value" let-rowIndex="rowIndex"
              let-row="row" let-disable$="disable$" ngx-datatable-cell-template>
              {{value}}
            </ng-template>
          </ngx-datatable-column>
          <ngx-datatable-column name="Gender">
            <ng-template let-value="value" let-rowIndex="rowIndex"
              let-row="row" let-disable$="disable$" ngx-datatable-cell-template>
                <select [style.height]="'auto'" [value]="value" (change)="updateValue($event, 'gender', rowIndex, disable$)"
                [disabled]="disable$ ? (disable$ | async) : false" [style.margin]="0">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
            </ng-template>
          </ngx-datatable-column>
          <ngx-datatable-column name="Age">
            <ng-template let-row="row" let-disable$="disable$" let-rowIndex="rowIndex"
              let-value="value" ngx-datatable-cell-template>
              <div [disabled]="disable$ | async" disable-row>
                <input (blur)="updateValue($event, 'age', rowIndex, disable$)"
                [value]="value" />
                <br/>
                <button (click)="disableRow(rowIndex, disable$)">Disable row</button>
              </div>
            </ng-template>
          </ngx-datatable-column>
        </ngx-datatable>
      </div>
    </div>
  `
})
export class DisabledRowsComponent {
  rows = [];

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  constructor() {
    this.fetch(data => {
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  isRowDisabled(row: any) {
    if (!row.isDisabled && row.age < 40) {
      return false;
    } else {
      return true;
    }
  }

  disableRow(rowIndex, disableRow$) {
    this.rows[rowIndex].isDisabled = true;
    this.rows = [...this.rows];
    disableRow$.next(true);
  }

  updateValue(event, cell, rowIndex, disableRow$) {
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    if (disableRow$ && cell === 'age' && this.rows[rowIndex][cell] > 40) {
      disableRow$.next(true);
    }
    if (disableRow$ && cell === 'gender' && this.rows[rowIndex][cell] === 'male') {
      disableRow$.next(true);
    }
  }
}
