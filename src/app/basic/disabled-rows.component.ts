import { Component } from '@angular/core';
import { ColumnMode, SelectionType } from 'projects/swimlane/ngx-datatable/src/public-api';
import { FullEmployee } from '../data.model';

@Component({
  selector: 'disabled-rows-demo',
  template: `
    <div>
      <h3>
        Disable Row
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/disabled-rows.component.ts"
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
          <ngx-datatable-column name="Name">
            <ng-template
              let-value="value"
              let-rowIndex="rowIndex"
              let-row="row"
              let-disabled="disabled"
              ngx-datatable-cell-template
            >
              {{ value }}
            </ng-template>
          </ngx-datatable-column>
          <ngx-datatable-column name="Gender">
            <ng-template
              let-value="value"
              let-rowIndex="rowIndex"
              let-row="row"
              let-disabled="disabled"
              ngx-datatable-cell-template
            >
              <select
                [style.height]="'auto'"
                [value]="value"
                (change)="updateValue($event, 'gender', rowIndex)"
                [disabled]="disabled"
                [style.margin]="0"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </ng-template>
          </ngx-datatable-column>
          <ngx-datatable-column name="Age">
            <ng-template
              let-row="row"
              let-disabled="disabled"
              let-rowIndex="rowIndex"
              let-value="value"
              ngx-datatable-cell-template
            >
              <div [disabled]="disabled" disable-row>
                <input (blur)="updateValue($event, 'age', rowIndex)" [value]="value" />
                <br />
                <button (click)="disableRow(rowIndex)">Disable row</button>
              </div>
            </ng-template>
          </ngx-datatable-column>
        </ngx-datatable>
      </div>
    </div>
  `,
  standalone: false
})
export class DisabledRowsComponent {
  rows: (FullEmployee & { isDisabled?: boolean })[] = [];

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

  isRowDisabled(row: FullEmployee & { isDisabled?: boolean }) {
    return !(!row.isDisabled && row.age < 40);
  }

  disableRow(rowIndex: number) {
    this.rows[rowIndex].isDisabled = true;
    this.rows = [...this.rows];
  }

  updateValue(event, cell, rowIndex: number) {
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    if (cell === 'age' && this.rows[rowIndex][cell] > 40) {
      this.rows[rowIndex].isDisabled = true;
    }
    if (cell === 'gender' && this.rows[rowIndex][cell] === 'male') {
      this.rows[rowIndex].isDisabled = true;
    }
  }
}
