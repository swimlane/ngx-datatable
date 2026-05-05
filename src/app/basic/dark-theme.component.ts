import { Component, inject, signal } from '@angular/core';
import { DatatableComponent, TableColumn } from 'projects/swimlane/ngx-datatable/src/public-api';

import { Employee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'dark-theme-demo',
  imports: [DatatableComponent],
  template: `
    <div>
      <h3>
        Dark Theme
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/dark-theme.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      @let rows = this.rows();
      @let loadingIndicator = this.loadingIndicator();
      <ngx-datatable
        class="dark"
        rowHeight="auto"
        columnMode="force"
        [rows]="rows"
        [loadingIndicator]="loadingIndicator"
        [columns]="columns"
        [headerHeight]="40"
        [summaryRow]="true"
        [footerHeight]="40"
        [limit]="10"
        [reorderable]="reorderable"
      />
    </div>
  `
})
export class DarkThemeComponent {
  readonly rows = signal<Employee[]>([]);
  readonly loadingIndicator = signal(true);
  reorderable = true;

  columns: TableColumn[] = [
    { prop: 'name', summaryFunc: () => null },
    { name: 'Gender', summaryFunc: cells => this.summaryForGender(cells) },
    { name: 'Company', summaryFunc: () => null }
  ];

  private dataService = inject(DataService);

  constructor() {
    this.dataService.load('company.json').subscribe(data => {
      this.rows.set(data);
      setTimeout(() => this.loadingIndicator.set(false), 1500);
    });
  }

  private summaryForGender(cells: string[]) {
    const males = cells.filter(cell => cell === 'male').length;
    const females = cells.filter(cell => cell === 'female').length;

    return `males: ${males}, females: ${females}`;
  }
}
