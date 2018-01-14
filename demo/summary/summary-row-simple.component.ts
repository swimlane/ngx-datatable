import { Component } from '@angular/core';

@Component({
  selector: 'summary-row-simple-demo',
  template: `
    <div>
      <h3>Simple Summary Row
        <small>
        <a href="https://github.com/sirwojtek/ngx-datatable/blob/summary-row/demo/summary/summary-row-simple.ts">
          Source
        </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [summaryRow]="true"
        [columns]="columns"
        [columnMode]="'force'"
        [headerHeight]="50"
        [rowHeight]="'auto'"
        [rows]="rows">
      </ngx-datatable>
    </div>
  `
})

export class SummaryRowSimpleComponent {
  rows = [];

  columns = [
    { prop: 'name', summaryFunc: () => null },
    { name: 'Gender', summaryFunc: (cells) => this.summaryForGender(cells) },
    { prop: 'age', summaryFunc: (cells) => this.avgAge(cells) },
  ];

  constructor() {
    this.fetch((data) => {
      this.rows = data.splice(0, 5);
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  private summaryForGender(cells: string[]) {
    const males = cells.filter(cell => cell === 'male').length;
    const females = cells.filter(cell => cell === 'female').length;

    return `males: ${males}, females: ${females}`;
  }

  private avgAge(cells: number[]): number {
    const filteredCells = cells.filter(cell => !!cell);
    return filteredCells.reduce((sum, cell) => sum += cell, 0) / filteredCells.length;
  }
}
