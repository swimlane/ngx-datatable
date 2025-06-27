import { Component, inject } from '@angular/core';
import {
  ColumnMode,
  DatatableComponent,
  TableColumn
} from 'projects/swimlane/ngx-datatable/src/public-api';
import { Employee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'comparator-sorting-demo',
  template: `
    <div>
      <h3>
        Custom Sorting Comparator
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/sorting/sorting-comparator.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [rows]="rows"
        [columns]="columns"
        [columnMode]="ColumnMode.force"
        [headerHeight]="50"
        [footerHeight]="50"
        rowHeight="auto"
      >
      </ngx-datatable>
    </div>
  `,
  imports: [DatatableComponent]
})
export class SortingComparatorComponent {
  rows: Employee[] = [];

  columns: TableColumn[] = [
    { name: 'Company', comparator: this.companyComparator.bind(this) },
    { name: 'Name', sortable: false },
    { name: 'Gender', sortable: false }
  ];

  ColumnMode = ColumnMode;

  private dataService = inject(DataService);

  constructor() {
    this.dataService.load('company.json').subscribe(data => {
      this.rows = data.splice(0, 20);
    });
  }

  companyComparator(propA: string, propB: string) {
    console.log('Sorting Comparator', propA, propB);

    // Just a simple sort function comparisoins
    if (propA.toLowerCase() < propB.toLowerCase()) {
      return -1;
    }
    if (propA.toLowerCase() > propB.toLowerCase()) {
      return 1;
    }

    return 0;
  }
}
