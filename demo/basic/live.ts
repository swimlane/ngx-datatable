import { Component } from '@angular/core';

@Component({
  selector: 'live-data-demo',
  template: `
    <div>
      <h3>
        Live Data Demo
        <small>
          <a href="#" (click)="start()">Start</a>
          <a href="#" (click)="stop()">Stop</a>
        </small>
      </h3>
      <swui-data-table
        #mydatatable
        class="material"
        [headerHeight]="50"
        [limit]="5"
        [columnMode]="'force'"
        [footerHeight]="50"
        [rowHeight]="'auto'"
        [trackByProp]="'updated'"
        [rows]="rows">
        <swui-data-table-column name="Name"></swui-data-table-column>
        <swui-data-table-column name="Gender"></swui-data-table-column>
        <swui-data-table-column name="Company"></swui-data-table-column>
      </swui-data-table>
    </div>
  `
})
export class LiveDataComponent {

  rows: any[] = [];
  active: boolean = true;
  cols: any = [
    'name', 'gender', 'company'
  ];

  constructor() {
    this.fetch((data) => {
      this.rows = data.map(d => {
        d.updated = Date.now().toString();
        return d;
      });
    });

    this.start();
  }

  randomNum(start: number, end: number): number {
    return Math.floor(Math.random() * end) + start;
  }

  start(): void {
    if(!this.active) return;

    setTimeout(this.updateRandom.bind(this), 50);
  }

  stop(): void {
    this.active = false;
  }

  updateRandom() {
    const rowNum = this.randomNum(0, 5);
    const cellNum = this.randomNum(0, 3);
    const newRow = this.randomNum(0, 100);
    const prop = this.cols[cellNum];
    let rows = this.rows;

    if(rows.length) {
      let row = rows[rowNum];
      row[prop] = this.rows[newRow][prop];
      row.updated = Date.now().toString();
    }

    this.start();
  }

  fetch(cb: any): void {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}
