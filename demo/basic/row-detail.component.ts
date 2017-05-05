import { Component, ViewEncapsulation, ViewChild } from '@angular/core';

@Component({
  selector: 'row-details-demo',
  template: `
    <div>
      <h3>
        Row Detail Demo
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/basic/row-detail.component.ts" target="_blank">
            Source
          </a>
        </small>
        <small>
          <a href="#" (click)="table.rowDetail.expandAllRows()">Expand All</a> | 
          <a href="#" (click)="table.rowDetail.collapseAllRows()">Collapse All</a>
        </small>
      </h3>
      <ngx-datatable
        #myTable
        class='material expandable'
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="50"
        [scrollbarV]="50"
        [rows]='rows'
        (page)="onPage($event)">
        <!-- Row Detail Template -->
        <ngx-datatable-row-detail [rowHeight]="100" #myDetailRow (toggle)="onDetailToggle($event)">
          <ng-template let-row="row" ngx-datatable-row-detail-template>
            <div style="padding-left:35px;">
              <div><strong>Address</strong></div>
              <div>{{row.address.city}}, {{row.address.state}}</div>
            </div>
          </ng-template>
        </ngx-datatable-row-detail>

        <!-- Column Templates -->
         <ngx-datatable-column
          [width]="50"
          [resizeable]="false"
          [sortable]="false"
          [draggable]="false"
          [canAutoResize]="false">
          <ng-template let-row="row" ngx-datatable-cell-template>
            <a
              href="#"
              [class.datatable-icon-right]="!row.$$expanded"
              [class.datatable-icon-down]="row.$$expanded"
              title="Expand/Collapse Row"
              (click)="toggleExpandRow(row)">
            </a>
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Index" width="80">
          <ng-template let-row="row" ngx-datatable-cell-template>
            <strong>{{row.$$index}}</strong>
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Expanded" width="80">
          <ng-template let-row="row" ngx-datatable-cell-template>
            <strong>{{row.$$expanded === 1}}</strong>
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Name" width="200">
          <ng-template let-value="value" ngx-datatable-cell-template>
            <strong>{{value}}</strong>
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Gender" width="300">
          <ng-template let-row="row" let-value="value" ngx-datatable-cell-template>
            <i [innerHTML]="row['name']"></i> and <i>{{value}}</i>
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Age" ></ngx-datatable-column>
      </ngx-datatable>
    </div>
  `,
  encapsulation: ViewEncapsulation.None

})
export class RowDetailsComponent {

  @ViewChild('myTable') table: any;

  rows: any[] = [];
  expanded: any = {};
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
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

}
