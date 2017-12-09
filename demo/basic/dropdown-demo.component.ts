import { Component } from '@angular/core';

@Component({
  selector: 'dropdown-demo',
  template: `
    <div>
      <h3>
        Full Screen
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/basic/fullscreen.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material fullscreen"
        style="top: 52px"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="0"
        [rowHeight]="50"
        [scrollbarV]="true"
        [scrollbarH]="true"
        [rows]="rows">
        <ngx-datatable-column name="Id" [width]="80"></ngx-datatable-column>
        <ngx-datatable-column name="Name" [width]="300"></ngx-datatable-column>

        <ngx-datatable-column name="More" [width]="100">
          <ng-template ngx-datatable-cell-template let-row="row">
          <div>
            <button (click)="toggleDropDown(row)" class="pointer"> Show More </button>
            <ul class="dropdown" *ngIf="row.dropdownopen">
              <li *ngFor="let item of row.dropdownitems" class="pointer">
                {{item}}
              </li>
            </ul>
          </div>
          </ng-template>
        </ngx-datatable-column>

      </ngx-datatable>
    </div>
  `,
  styles: [
    `
    .dropdown {
      position: absolute;
      min-width: 160px;
      padding: 5px 0;
      margin: 2px 0 0;
      list-style: none;
      font-size: 14px;
      text-align: left;
      background-color: #FFF;
      border-radius: 2px;
      z-index: 1;
      background-clip: padding-box;
      border: 1px solid;
    }
    .pointer {
      cursor: pointer;
    }
    li:hover {
      background-color: #b2b2b2;
    }
    `
  ]
})
export class DropdownDemoComponent {

  rows = [];
  constructor() {
    this.fetch((data) => {
      this.rows = data.slice(0, 10);
      this.rows = this.rows.map(row => {
        row['dropdownitems'] = Object.keys(row).map(key => `${key}: ${row[key]}`);
        row['dropdownopen'] = false;
        return row;
      });
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

  toggleDropDown(row) {
    this.rows = this.rows.map(r => {
      if (r.name === row.name) {
        r.dropdownopen = !row.dropdownopen;
      } else {
        r.dropdownopen = false;
      }
      return r;
    });
  }

}
