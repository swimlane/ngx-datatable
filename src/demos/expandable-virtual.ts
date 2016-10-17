import { Component, ViewEncapsulation } from '@angular/core';
import { ColumnMode, TableOptions } from '../index';
import '../themes/material.scss';

@Component({
  selector: 'app',
  template: `
    <div>
      <h3>Expandable Demo  (Click on E below to expand)</h3>

      <span (click)="mydatatable.expandAllRows()">Expand All Rows</span>| &nbsp;
      <span (click)="mydatatable.collapseAllRows()">Collapse All Rows</span>| &nbsp;
   
      <datatable #mydatatable
        class='material'
        [rows]='rows'
        (onPageChange)="paged($event)"
        [options]='options'
        style='height:calc(100vh - 100px);width: calc(100vw - 50px)'>
        <datatable-row-detail-template>
          <template let-row="row">
            <div style="background-color: #00E676">
              <strong>{{row.$$index}}</strong>
            </div>
            
          </template>
        </datatable-row-detail-template>
        
        <datatable-column name="Index" width="80">
          <template let-row="row">
            <strong>{{row.$$index}}</strong>
          </template>
        </datatable-column>
         <datatable-column name="Click" width="80">
          <template let-row="row">
            <a (click)="mydatatable.toggleExpandRow(row)" >E</a>
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

        <datatable-column name="Age" >
        </datatable-column>

      </datatable>
    </div>
  `,
  styles: [
    `
    .datatable-row-detail {
      background-color: greenyellow;
    }
  `
  ],
  encapsulation: ViewEncapsulation.None

})
export class App {

  rows = [];
  expanded = {};
  timeout: any;

  options = new TableOptions({
    columnMode: ColumnMode.force,
    headerHeight: 50,
    footerHeight: 50,
    rowHeight: 50,
    detailRowHeight: 100,
    scrollbarV: true,
  });

  constructor() {
    this.fetch((data) => {
      this.rows.push(...data);
    });
  }

  paged(event) {
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

  // rowClick(args) {
  //   console.log('rowClick', args);
  // }
}
