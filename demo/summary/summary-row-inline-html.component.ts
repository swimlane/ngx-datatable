import { Component } from '@angular/core';

@Component({
  selector: 'summary-row-inline-html',
  template: `
    <div>
      <h3>Simple Summary Row
        <small>
        <a href="https://github.com/swimlane/ngx-datatable/blob/summary-row/demo/summary/summary-row-inline-html.component.ts">
          Source
        </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [summaryRow]="enableSummary"
        [summaryPosition]="summaryPosition"
        [columnMode]="'force'"
        [headerHeight]="50"
        [rowHeight]="'auto'"
        [rows]="rows">
        <ngx-datatable-column prop="name" [summaryFunc]="summaryForName"></ngx-datatable-column>
        <ngx-datatable-column name="Gender" [summaryFunc]="summaryForGender"></ngx-datatable-column>
        <ngx-datatable-column prop="age" [summaryFunc]="avgAge"></ngx-datatable-column>
      </ngx-datatable>
    </div>
  `,
})

export class SummaryRowInlineHtmlComponent {
  rows = [];

  enableSummary = true;
  summaryPosition = 'top';

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

  summaryForName() { return null; }

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
