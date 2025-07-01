import { Component, inject } from '@angular/core';
import {
  ActivateEvent,
  DatatableComponent,
  SelectEvent,
  TableColumn
} from 'projects/ngx-datatable/src/public-api';

import { Employee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'cell-selection-demo',
  template: `
    <div>
      <h3>
        Cell Selection
        <small>
          <a
            href="https://github.com/siemens/ngx-datatable/blob/main/src/app/selection/selection-cell.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material selection-cell"
        [rows]="rows"
        [columnMode]="'force'"
        [columns]="columns"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="50"
        [selected]="selected"
        [selectionType]="'cell'"
        (select)="onSelect($event)"
        (activate)="onActivate($event)"
      >
      </ngx-datatable>
    </div>
  `,
  imports: [DatatableComponent]
})
export class CellSelectionComponent {
  rows: Employee[] = [];
  selected: Employee[] = [];
  columns: TableColumn[] = [{ prop: 'name' }, { name: 'Company' }, { name: 'Gender' }];

  private dataService = inject(DataService);

  constructor() {
    this.dataService.load('company.json').subscribe(data => {
      this.rows = data;
    });
  }

  onSelect(event: SelectEvent<Employee>) {
    console.log('Event: select', event, this.selected);
  }

  onActivate(event: ActivateEvent<Employee>) {
    console.log('Event: activate', event);
  }
}
