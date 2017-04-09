import { Component } from '@angular/core';

@Component({
  selector: 'live-data-demo',
  template: `
    <div>
      <h3>
        Live Data Demo
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/basic/live.component.ts" target="_blank">
            Source
          </a>
        </small>
        <small>
          <a href="#" (click)="start()">Start</a> |
          <a href="#" (click)="stop()">Stop</a> | 
          <a href="#" (click)="add()">Add</a> |
          <a href="#" (click)="remove()">Remove</a>
        </small>
      </h3>
      <ngx-datatable
        #mydatatable
        class="material"
        [headerHeight]="50"
        [limit]="5"
        [columnMode]="'force'"
        [footerHeight]="50"
        [rowHeight]="'auto'"
        [trackByProp]="'updated'"
        [rows]="rows">
        <ngx-datatable-column name="Name"></ngx-datatable-column>
        <ngx-datatable-column name="Gender"></ngx-datatable-column>
        <ngx-datatable-column name="Company"></ngx-datatable-column>
      </ngx-datatable>
    </div>
  `
})
export class LiveDataComponent {

  count: number = 50;
  rows: any[] = [];
  active: boolean = true;
  temp: any[] = [];
  cols: any = [
    'name', 'gender', 'company'
  ];

  constructor() {
    this.fetch((data) => {
      this.rows = data.map(d => {
        d.updated = Date.now().toString();
        return d;
      });

      this.temp = [...this.rows];
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

  add() {
    this.rows.splice(0, 0, this.temp[this.count++]);
  }

  remove() {
    this.rows.splice(0, this.rows.length);
  }

  updateRandom() {
    const rowNum = this.randomNum(0, 5);
    const cellNum = this.randomNum(0, 3);
    const newRow = this.randomNum(0, 100);
    const prop = this.cols[cellNum];
    const rows = this.rows;

    if(rows.length) {
      const row = rows[rowNum];
      row[prop] = rows[newRow][prop];
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
