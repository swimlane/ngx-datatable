import { Component, inject } from '@angular/core';
import { DatatableComponent, TableColumn } from 'projects/swimlane/ngx-datatable/src/public-api';

import { Employee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'simple-summary-demo',
  imports: [DatatableComponent],
  template: `
    <div>
      <h3>
        Simple Summary
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/summary/simple-summary.component.ts"
          >
            Source
          </a>
        </small>
      </h3>
      <div class="controls">
        <div>
          <input
            id="enable-summary"
            type="checkbox"
            [checked]="enableSummary"
            (change)="enableSummary = !enableSummary"
          />
          <label for="enable-summary">Enable Summary Row</label>
        </div>
        <div>
          <label for="position-select">Position</label>
          <select id="position-select" (change)="onPositionSelectChange($event)">
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
          </select>
        </div>
      </div>
      <ngx-datatable
        class="material"
        rowHeight="auto"
        columnMode="force"
        [summaryRow]="enableSummary"
        [summaryPosition]="summaryPosition"
        [columns]="columns"
        [headerHeight]="50"
        [summaryHeight]="55"
        [rows]="rows"
      />
    </div>
  `,
  styleUrl: './simple-summary.component.scss'
})
export class SimpleSummaryComponent {
  rows: Employee[] = [];

  columns: TableColumn[] = [
    { prop: 'name' },
    { name: 'Gender', summaryFunc: cells => this.summaryForGender(cells) },
    { prop: 'age', summaryFunc: cells => this.avgAge(cells) }
  ];

  enableSummary = true;
  summaryPosition = 'top';

  private dataService = inject(DataService);

  constructor() {
    this.dataService.load('company.json').subscribe(data => {
      this.rows = data.splice(0, 5);
    });
  }

  onPositionSelectChange($event: Event) {
    const target = $event.target as HTMLSelectElement;
    this.summaryPosition = target.value;
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
