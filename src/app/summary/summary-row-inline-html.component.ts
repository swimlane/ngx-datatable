import { Component, inject } from '@angular/core';
import {
  ColumnMode,
  DataTableColumnDirective,
  DatatableComponent
} from 'projects/swimlane/ngx-datatable/src/public-api';
import { Employee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'summary-row-inline-html',
  template: `
    <div>
      <h3>
        Inline HTML template
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/summary/summary-row-inline-html.component.ts"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [summaryRow]="enableSummary"
        [summaryPosition]="summaryPosition"
        [summaryHeight]="100"
        [columnMode]="ColumnMode.force"
        [headerHeight]="50"
        rowHeight="auto"
        [rows]="rows"
      >
        <ngx-datatable-column
          prop="name"
          [summaryTemplate]="nameSummaryCell"
        ></ngx-datatable-column>
        <ngx-datatable-column name="Gender" [summaryFunc]="summaryForGender"></ngx-datatable-column>
        <ngx-datatable-column prop="age" [summaryFunc]="avgAge"></ngx-datatable-column>
      </ngx-datatable>
      <ng-template #nameSummaryCell>
        <div class="name-container">
          @for (name of getNames(); track name) {
          <div class="chip">
            <span class="chip-content">{{ name }}</span>
          </div>
          }
        </div>
      </ng-template>
    </div>
  `,
  imports: [DatatableComponent, DataTableColumnDirective]
})
export class SummaryRowInlineHtmlComponent {
  rows: Employee[] = [];

  enableSummary = true;
  summaryPosition = 'top';

  ColumnMode = ColumnMode;

  private dataService = inject(DataService);

  constructor() {
    this.dataService.load('company.json').subscribe(data => {
      this.rows = data.splice(0, 5);
    });
  }

  getNames(): string[] {
    return this.rows.map(row => row.name).map(fullName => fullName.split(' ')[1]);
  }

  summaryForGender(cells: string[]) {
    const males = cells.filter(cell => cell === 'male').length;
    const females = cells.filter(cell => cell === 'female').length;

    return `males: ${males}, females: ${females}`;
  }

  avgAge(cells: number[]): number {
    const filteredCells = cells.filter(cell => !!cell);
    return filteredCells.reduce((sum, cell) => (sum += cell), 0) / filteredCells.length;
  }
}
