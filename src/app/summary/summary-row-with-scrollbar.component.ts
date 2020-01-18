import { Component } from '@angular/core';

@Component({
  selector: 'summary-row-with-scrollbar-demo',
  template: `
    <div>
      <h3>
        Summary Row With Scrollbar
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/demo/summary/summary-row-with-scrollbar.component.ts"
          >
            Source
          </a>
        </small>
      </h3>
      <div class="controls">
        <div>
          <label for="position-select">Position</label>
          <select id="position-select" (change)="summaryPosition = $event.target.value">
            <option [value]="'top'">Top</option>
            <option [value]="'bottom'">Bottom</option>
          </select>
        </div>
      </div>
      <ngx-datatable
        class="material"
        columnMode="force"
        [rowHeight]="40"
        [summaryRow]="true"
        [summaryPosition]="summaryPosition"
        [summaryHeight]="90"
        [columns]="columns"
        [headerHeight]="50"
        [scrollbarV]="true"
        [rows]="rows"
      >
      </ngx-datatable>
    </div>
  `,
  styleUrls: ['./summary-row-with-scrollbar.component.scss']
})
export class SummaryRowWithScrollbarComponent {
  rows = [];

  columns = [
    { prop: 'name' },
    { name: 'Gender', summaryFunc: cells => this.summaryForGender(cells) },
    { name: 'Company' }
  ];

  summaryPosition = 'top';

  constructor() {
    this.fetch(data => {
      this.rows = data.splice(0, 50);
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
    return filteredCells.reduce((sum, cell) => (sum += cell), 0) / filteredCells.length;
  }
}
