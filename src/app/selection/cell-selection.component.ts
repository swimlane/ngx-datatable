import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import {
  ActivateEvent,
  DatatableComponent,
  TableColumn
} from 'projects/swimlane/ngx-datatable/src/public-api';

import { Employee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'cell-selection-demo',
  imports: [DatatableComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div>
      <h3>
        Cell Selection
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/selection/cell-selection.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      @let rows = this.rows();
      <ngx-datatable
        class="material selection-cell"
        columnMode="force"
        selectionType="cell"
        [rows]="rows"
        [columns]="columns"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="50"
        [selected]="selected"
        (selectedChange)="onSelect($event)"
        (activate)="onActivate($event)"
      />
    </div>
  `
})
export class CellSelectionComponent {
  readonly rows = signal<Employee[]>([]);
  selected: Employee[] = [];
  columns: TableColumn[] = [{ prop: 'name' }, { name: 'Company' }, { name: 'Gender' }];

  private dataService = inject(DataService);

  constructor() {
    this.dataService.load('company.json').subscribe(data => {
      this.rows.set(data);
    });
  }

  onSelect(event: Employee[]) {
    // eslint-disable-next-line no-console
    console.log('Event: select', event, this.selected);
  }

  onActivate(event: ActivateEvent<Employee>) {
    // eslint-disable-next-line no-console
    console.log('Event: activate', event);
  }
}
