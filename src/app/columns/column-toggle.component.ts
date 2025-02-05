import { Component } from '@angular/core';
import { ColumnMode, TableColumn } from 'projects/swimlane/ngx-datatable/src/public-api';
import { Employee } from '../data.model';

@Component({
  selector: 'column-toggle-demo',
  template: `
    <div>
      <h3>
        Column Toggling
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/columns/column-toggle.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <div style="float:left;width:75%">
        <ngx-datatable
          class="material"
          [rows]="rows"
          [columnMode]="ColumnMode.force"
          [headerHeight]="50"
          [footerHeight]="50"
          rowHeight="auto"
        >
          @for (col of columns; track col) {
          <ngx-datatable-column [name]="col.name"> </ngx-datatable-column>
          }
        </ngx-datatable>
      </div>
      <div class="selected-column">
        <h4>Available Columns</h4>
        <ul>
          @for (col of allColumns; track col) {
          <li>
            <input
              type="checkbox"
              [id]="col.name"
              (click)="toggle(col)"
              [checked]="isChecked(col)"
            />
            <label [attr.for]="col.name">{{ col.name }}</label>
          </li>
          }
        </ul>
      </div>
    </div>
  `,
  standalone: false
})
export class ColumnToggleComponent {
  rows: Employee[] = [
    {
      name: 'Claudine Neal',
      gender: 'female',
      company: 'Sealoud'
    },
    {
      name: 'Beryl Rice',
      gender: 'female',
      company: 'Velity'
    }
  ];

  columns: TableColumn[] = [{ name: 'Name' }, { name: 'Gender' }, { name: 'Company' }];

  allColumns: TableColumn[] = [{ name: 'Name' }, { name: 'Gender' }, { name: 'Company' }];

  ColumnMode = ColumnMode;

  toggle(col: TableColumn) {
    const isChecked = this.isChecked(col);

    if (isChecked) {
      this.columns = this.columns.filter(c => {
        return c.name !== col.name;
      });
    } else {
      this.columns = [...this.columns, col];
    }
  }

  isChecked(col: TableColumn) {
    return this.columns.find(c => c.name === col.name) !== undefined;
  }
}
