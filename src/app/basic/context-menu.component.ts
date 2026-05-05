import { Component, inject } from '@angular/core';
import {
  ContextMenuEvent,
  DatatableComponent,
  TableColumn
} from 'projects/swimlane/ngx-datatable/src/public-api';

import { Employee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'context-menu-demo',
  imports: [DatatableComponent],
  template: `
    <div>
      <h3>
        Context Menu
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/context-menu.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <div class="info">
        <p>
          <strong>Note:</strong> ngx-datatable does not provide a context menu feature. This
          demonstrates how you would access the <code>contextmenu</code> event to display your own
          custom context menu.
        </p>
        @if (rawEvent) {
          <p>
            <strong>Mouse position:</strong>
            <code>(x: {{ rawEvent?.x }}, y: {{ rawEvent?.y }})</code>
          </p>
        }
        @if (contextmenuRow) {
          <p><strong>Row:</strong> {{ contextmenuRow?.name }}</p>
        }
        @if (contextmenuColumn) {
          <p>
            <strong>Header:</strong> name: {{ contextmenuColumn?.name }} prop:
            {{ contextmenuColumn?.prop }}
          </p>
        }
      </div>
      <ngx-datatable
        class="material"
        rowHeight="auto"
        columnMode="force"
        [rows]="rows"
        [columns]="columns"
        [headerHeight]="50"
        [footerHeight]="50"
        (tableContextmenu)="onTableContextMenu($event)"
      />
    </div>
  `
})
export class ContextMenuComponent {
  rows: Employee[] = [];

  columns: TableColumn[] = [{ prop: 'name' }, { name: 'Gender' }, { name: 'Company' }];

  rawEvent: any;
  contextmenuRow: any;
  contextmenuColumn: any;

  private dataService = inject(DataService);

  constructor() {
    this.dataService.load('company.json').subscribe(data => {
      this.rows = data;
    });
  }

  onTableContextMenu(contextMenuEvent: ContextMenuEvent<Employee>) {
    this.rawEvent = contextMenuEvent.event;
    if (contextMenuEvent.type === 'body') {
      this.contextmenuRow = contextMenuEvent.content;
      this.contextmenuColumn = undefined;
    } else {
      this.contextmenuColumn = contextMenuEvent.content;
      this.contextmenuRow = undefined;
    }

    contextMenuEvent.event.preventDefault();
    contextMenuEvent.event.stopPropagation();
  }
}
