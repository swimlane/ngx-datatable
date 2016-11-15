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
      <datatable
        #mydatatable
        class="material"
        [headerHeight]="50"
        [limit]="5"
        [columnMode]="'force'"
        [footerHeight]="50"
        [rowHeight]="'auto'"
        [rows]="rows">
        <datatable-column name="Type" prop="Type"></datatable-column>
        <datatable-column name="Organization" prop="Organization"></datatable-column>
        <datatable-column name="Date Added" prop="DateAdded"></datatable-column>
        <datatable-column name="Tags" prop="Tags">
          <template let-value="value">
            {{value}}
          </template>
        </datatable-column>
      </datatable>
    </div>
  `
})
export class LiveDataComponent {

  rows: any[] = [];
  active: boolean = true;
  cols: any = [
    'Type', 'Organization', 'DateAdded', 'Tags'
  ];

  constructor() {
    this.fetch((data) => {
      this.rows = data;
    });

    this.start();
  }

  randomNum(start: number, end: number): number {
    return Math.floor(Math.random() * end) + start;
  }

  start(): void {
    if(!this.active) return;

    setTimeout(this.updateRandom.bind(this), 20);
  }

  stop(): void {
    this.active = false;
  }

  updateRandom() {
    const rowNum = this.randomNum(0, 4);
    const cellNum = this.randomNum(0, 3);
    const newRow = this.randomNum(0, 100);
    const prop = this.cols[cellNum];

    if(this.rows.length) {
      this.rows[rowNum][prop] = this.rows[newRow][prop];
    }
    
    this.start();
  }

  fetch(cb: any): void {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/security.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}
