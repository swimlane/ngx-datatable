import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ColumnMode, TableColumn } from 'projects/swimlane/ngx-datatable/src/public-api';
import { Employee } from '../data.model';

@Component({
  selector: 'summary-row-custom-template-demo',
  template: `
    <div>
      <h3>
        Summary Row with Custom Template
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/summary/summary-row-custom-template.component.ts"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [summaryRow]="true"
        [columns]="columns"
        [columnMode]="ColumnMode.force"
        [headerHeight]="50"
        [rowHeight]="'auto'"
        [summaryHeight]="55"
        [rows]="rows"
      >
      </ngx-datatable>
      <ng-template #nameSummaryCell let-row="row" let-value="value">
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
  styleUrls: ['./summary-row-custom-template.component.scss'],
  standalone: false
})
export class SummaryRowCustomTemplateComponent implements OnInit {
  rows: Employee[] = [];

  @ViewChild('nameSummaryCell') nameSummaryCell: TemplateRef<any>;

  columns: TableColumn[] = [];

  ColumnMode = ColumnMode;

  constructor() {
    this.fetch(data => {
      this.rows = data.splice(0, 5);
    });
  }

  ngOnInit() {
    this.columns = [
      {
        prop: 'name',
        summaryFunc: () => null,
        summaryTemplate: this.nameSummaryCell
      },
      { name: 'Gender', summaryFunc: cells => this.summaryForGender(cells) },
      { prop: 'age', summaryFunc: cells => this.avgAge(cells) }
    ];
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  getNames(): string[] {
    return this.rows.map(row => row.name).map(fullName => fullName.split(' ')[1]);
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
