import { Component, ViewChild } from '@angular/core';
import { DatatableComponent } from '../../src/components/datatable.component';
import { columnGroupWidths } from '../../src/utils/column';

@Component({
  selector: 'sub-header-demo',
  template: `
    <div>
      <h3>
        Sub Header Templates
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/templates/sub-header.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [scrollbarH]="true"
        [loadingIndicator]="loadingIndicator"
        [rows]="rows"
        [columnMode]="'force'"
        [headerHeight]="'auto'"
        [footerHeight]="50"
        [rowHeight]="'auto'">
        <ngx-datatable-column name="Name">          
          <ng-template let-column="column" ngx-datatable-sub-header-template>
            <em>Person's name</em>
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Age" [subHeaderTemplate]="ageTpl"></ngx-datatable-column>
        <ngx-datatable-column name="Gender">
          <ng-template let-column="column" ngx-datatable-sub-header-template>
            <select (change)="updateFilter($event)">
              <option value="all">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </ng-template>
        </ngx-datatable-column>
      </ngx-datatable>
    </div>

    <ng-template #ageTpl let-column="column" ngx-datatable-sub-header-template>
      <em>Person's age description</em>
    </ng-template>
  `
})
export class SubHeaderComponent {
  loadingIndicator: boolean;

  rows = [];

  temp = [];
  
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor() {
    this.fetch((data) => {
      // cache our list
      this.temp = [...data];

      // push our initial complete list
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

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    this.loadingIndicator = true;

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.gender.toLowerCase() === val || val === 'all';
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
    setTimeout(() => this.loadingIndicator = false, 2000);
  }
}
