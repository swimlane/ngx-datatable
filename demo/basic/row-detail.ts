import { Component, ViewEncapsulation, ViewChild } from '@angular/core';

@Component({
  selector: 'row-details-demo',
  template: `
    <div>
      <h3>
        Row Detail Demo
        <small>
          <a href="#" (click)="mydatatable.expandAllRows()">Expand All</a> | 
          <a href="#" (click)="mydatatable.collapseAllRows()">Collapse All</a>
        </small>
      </h3>
      <datatable
        #mydatatable
        class='material expandable'
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="50"
        [detailRowHeight]="100"
        [scrollbarV]="50"
        [rows]='rows'
        (page)="onPage($event)">
        <datatable-row-detail-template>
          <template let-row="row">
            <div style="padding-left:35px;">
              <div><strong>Address</strong></div>
              <div>{{row.address.city}}, {{row.address.state}}</div>
            </div>
          </template>
        </datatable-row-detail-template>
         <datatable-column
          [width]="50"
          [resizeable]="false"
          [sortable]="false"
          [draggable]="false"
          [canAutoResize]="false">
          <template let-row="row">
            <a
              href="#"
              [class.icon-right]="!row.$$expanded"
              [class.icon-down]="row.$$expanded"
              title="Expand/Collapse Row"
              (click)="toggleExpandRow(row)">
            </a>
          </template>
        </datatable-column>
        <datatable-column name="Index" width="80">
          <template let-row="row">
            <strong>{{row.$$index}}</strong>
          </template>
        </datatable-column>
        <datatable-column name="Exapanded" width="80">
          <template let-row="row">
            <strong>{{row.$$expanded === 1}}</strong>
          </template>
        </datatable-column>
        <datatable-column name="Name" width="200">
          <template let-value="value">
            <strong>{{value}}</strong>
          </template>
        </datatable-column>
        <datatable-column name="Gender" width="300">
          <template let-row="row" let-value="value">
            <i [innerHTML]="row['name']"></i> and <i>{{value}}</i>
          </template>
        </datatable-column>
        <datatable-column name="Age" ></datatable-column>
      </datatable>
    </div>
  `,
  encapsulation: ViewEncapsulation.None

})
export class RowDetailsComponent {

  @ViewChild('mydatatable') table;

  rows = [];
  expanded = {};
  timeout: any;

  constructor() {
    this.fetch((data) => {
      this.rows = data;
    });
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  fetch(cb) {
    let req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.toggleExpandRow(row);
  }

}
