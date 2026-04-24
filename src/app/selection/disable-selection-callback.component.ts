import { Component, inject, signal } from '@angular/core';
import {
  ActivateEvent,
  DatatableComponent,
  SelectEvent,
  TableColumn
} from 'projects/swimlane/ngx-datatable/src/public-api';

import { Employee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'disable-selection-callback-demo',
  imports: [DatatableComponent],
  template: `
    <div>
      <h3>
        Disable Selection Callback
        <small>
          <a
            href="https://github.com/siemens/ngx-datatable/blob/main/src/app/selection/disable-selection-callback.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <div style="float:left;width:75%">
        @let rows = this.rows();
        <ngx-datatable
          class="material selection-row"
          rowHeight="auto"
          columnMode="force"
          selectionType="multi"
          [rows]="rows"
          [columns]="columns"
          [headerHeight]="50"
          [footerHeight]="50"
          [limit]="5"
          [selectCheck]="checkSelectable"
          [selected]="selected"
          (activate)="onActivate($event)"
          (select)="onSelect($event)"
        />
      </div>

      <div class="selected-column">
        <h4>Selections</h4>
        <ul>
          @for (sel of selected; track sel) {
            <li>
              {{ sel.name }}
            </li>
          } @empty {
            <li>No Selections</li>
          }
        </ul>
      </div>
    </div>
  `
})
export class DisableSelectionCallbackComponent {
  readonly rows = signal<Employee[]>([]);

  selected: Employee[] = [];

  columns: TableColumn[] = [{ prop: 'name' }, { name: 'Company' }, { name: 'Gender' }];

  private dataService = inject(DataService);

  constructor() {
    this.dataService.load('company.json').subscribe(data => this.rows.set(data));
  }

  onSelect({ selected }: SelectEvent<Employee>) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event: ActivateEvent<Employee>) {
    // eslint-disable-next-line no-console
    console.log('Activate Event', event);
  }

  checkSelectable(event: Employee) {
    return event.name !== 'Ethel Price';
  }
}
