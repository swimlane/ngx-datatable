import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'dynamic-height-demo',
  template: `
    <div>
      <h3>
        Dynamic Height w/ Virtual Scrolling
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/basic/dynamic-height.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        #myTable
        class="material expandable gk-toplevel-container"
        [columnMode]="'force'"
        [headerHeight]="40"
        [footerHeight]="50"
        [rowHeight]="40"
        [scrollbarV]="40"
        [rows]="yearlySums">
        <!-- Row Detail Template -->
        <ngx-datatable-row-detail [rowHeight]="getRowDetailsHeight" (toggle)="onDetailToggle($event)">
            <ng-template let-yearrow="row" ngx-datatable-row-detail-template>
                
            </ng-template>
        </ngx-datatable-row-detail>
        <!-- Column Templates -->
        <ngx-datatable-column
          [width]="60" [resizeable]="false" [sortable]="false" [draggable]="false" [canAutoResize]="false">
            <ng-template let-row="row" ngx-datatable-cell-template>
                <a
                  href="#"
                  [class.icon-right]="!row.$$expanded"
                  [class.icon-down]="row.$$expanded"
                  title="Expand/Collapse Row"
                  (click)="toggleExpandRow(row)">
                </a>
            </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="year">
            <ng-template let-row="row" ngx-datatable-cell-template>
                <strong>{{row.year}}</strong>
            </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="sum">
            <ng-template let-row="row" ngx-datatable-cell-template>
                <strong>{{row.sum}}</strong>
            </ng-template>
        </ngx-datatable-column>
    </ngx-datatable>
</div>
  `
})
export class DynamicHeightComponent {

  @ViewChild('myTable') table: any;

  // year, sum pairs
  public yearlySums: Array<{year: number, sum: number, height: number}> = [];

  constructor() {
    this.fetch();
  }

  fetch() {
    this.yearlySums.push({year: 2015, sum: 1750000, height: 50});
    this.yearlySums.push({year: 2016, sum: 2750000, height: 150});
    this.yearlySums.push({year: 2017, sum: 6750000, height: 75});
    this.yearlySums.push({year: 2022, sum: 750000, height: 250});
  }

  public getRowDetailsHeight = (row) => {
    if (row) {
      // tslint:disable-next-line:no-console
      console.log("Details height:", row.height, "index:", row.$$index);
      return row.height;
    }
    console.log("NO Details height");
    return 0;
  }

  public toggleExpandRow = (row) => {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  public onDetailToggle = (event) => {
    console.log('Detail Toggled', event);
  }

}
