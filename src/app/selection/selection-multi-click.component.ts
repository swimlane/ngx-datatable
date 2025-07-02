import { Component, inject } from '@angular/core';
import {
  ActivateEvent,
  DatatableComponent,
  SelectEvent,
  TableColumn
} from 'projects/swimlane/ngx-datatable/src/public-api';

import { Employee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'multi-click-selection-demo',
  template: `
    <div>
      <h3>
        Multi Click Selection
        <small>
          <a
            href="https://github.com/siemens/ngx-datatable/blob/main/src/app/selection/selection-multi-click.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <div style="float:left;width:75%">
        <div class="info">
          <p>This demonstrates multi selection table, where any click event causes a selection.</p>
        </div>

        <ngx-datatable
          class="material selection-row"
          rowHeight="auto"
          columnMode="force"
          selectionType="multiClick"
          [rows]="rows"
          [columns]="columns"
          [headerHeight]="50"
          [footerHeight]="50"
          [limit]="5"
          [selected]="selected"
          (activate)="onActivate($event)"
          (select)="onSelect($event)"
        >
        </ngx-datatable>
      </div>

      <div class="selected-column">
        <h4>Selections</h4>
        <ul>
          @for (sel of selected; track sel) {
          <li>
            {{ sel.name }}
          </li>
          } @if (!selected.length) {
          <li>No Selections</li>
          }
        </ul>
      </div>
    </div>
  `,
  imports: [DatatableComponent]
})
export class MultiClickSelectionComponent {
  rows: Employee[] = [];

  selected: Employee[] = [];

  columns: TableColumn[] = [{ prop: 'name' }, { name: 'Company' }, { name: 'Gender' }];

  private dataService = inject(DataService);

  constructor() {
    this.dataService.load('company.json').subscribe(data => {
      this.rows = data;
    });
  }

  onSelect({ selected }: SelectEvent<Employee>) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event: ActivateEvent<TableColumn>) {
    console.log('Activate Event', event);
  }
}
