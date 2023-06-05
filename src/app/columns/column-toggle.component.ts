import { Component } from '@angular/core';
import { ColumnMode } from 'projects/swimlane/ngx-datatable/src/public-api';

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
          <ngx-datatable-column *ngFor="let col of columns" [name]="col.name"> </ngx-datatable-column>
        </ngx-datatable>
      </div>
      <div class="selected-column">
        <h4>Available Columns</h4>
        <ul>
          <li *ngFor="let col of allColumns">
            <input type="checkbox" [id]="col.name" (click)="toggle(col)" [checked]="isChecked(col)" />
            <label [attr.for]="col.name">{{ col.name }}</label>
          </li>
        </ul>
      </div>
      <div class="selected-column">
        <h4>Dropdown</h4>
        <form>
          <div class="multiselect">
            <div class="selectBox" (click)="showCheckboxes()">
              <select>
                <option>Show/Hide Column</option>
              </select>
              <div class="overSelect"></div>
            </div>
            <div id="checkboxes">
              <label for="select/unselect">
                <input
                  type="checkbox"
                  id="select/Unselect"
                  [checked]="allColumnsChecked"
                  (click)="allColumnsChecked ? uncheckAll() : checkAll()"
                />{{ allColumnsChecked ? 'Unselect All' : 'Select All' }}</label
              >
              <label *ngFor="let col of allColumns" [for]="col.name">
                <input type="checkbox" [id]="col.name" [checked]="isChecked(col)" (click)="toggle(col)" />{{
                  col.name
                }}</label
              >
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      .multiselect {
        width: 200px;
        margin: 0 auto;
      }

      .selectBox {
        position: relative;
      }

      .selectBox select {
        width: 100%;
        font-weight: bold;
      }

      .overSelect {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      }

      #checkboxes {
        display: none;
        border: 1px #dadada solid;
      }

      #checkboxes label {
        display: block;
      }

      #checkboxes label:hover {
        background-color: #1e90ff;
      }
    `
  ]
})
export class ColumnToggleComponent {
  rows = [
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

  columns = [{ name: 'Name' }, { name: 'Gender' }, { name: 'Company' }];

  allColumns = [{ name: 'Name' }, { name: 'Gender' }, { name: 'Company' }];

  ColumnMode = ColumnMode;

  allColumnsChecked: boolean = true;
  expanded: boolean = false;

  toggle(col) {
    const isChecked = this.isChecked(col);

    if (isChecked) {
      this.columns = this.columns.filter(c => {
        return c.name !== col.name;
      });
    } else {
      this.columns = [...this.columns, col];
    }
  }

  isChecked(col) {
    return (
      this.columns.find(c => {
        return c.name === col.name;
      }) !== undefined
    );
  }

  checkAll() {
    this.columns = this.allColumns;
    this.allColumnsChecked = true;
  }

  uncheckAll() {
    if (this.columns.length == 0) {
      this.columns = this.allColumns;
      this.allColumnsChecked = true;
    } else {
      this.columns = [];
      this.allColumnsChecked = false;
    }
  }

  showCheckboxes() {
    var checkboxes = document.getElementById('checkboxes');
    if (!this.expanded) {
      checkboxes.style.display = 'block';
      this.expanded = true;
    } else {
      checkboxes.style.display = 'none';
      this.expanded = false;
    }
  }
}
