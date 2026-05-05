import { Component, inject } from '@angular/core';
import {
  DataTableColumnCellDirective,
  DataTableColumnDirective,
  DatatableComponent
} from 'projects/swimlane/ngx-datatable/src/public-api';

import { TreeEmployee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'client-side-tree-demo',
  imports: [DatatableComponent, DataTableColumnDirective, DataTableColumnCellDirective],
  template: `
    <div>
      <h3>
        Client Side Tree
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/tree/client-side-tree.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        rowHeight="auto"
        columnMode="flex"
        treeFromRelation="manager"
        treeToRelation="name"
        [headerHeight]="50"
        [footerHeight]="50"
        [rows]="rows"
        (treeAction)="onTreeAction($event)"
      >
        <ngx-datatable-column name="Name" [flexGrow]="3" [isTreeColumn]="true">
          <ng-template let-value="value" ngx-datatable-cell-template>
            {{ value }}
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Gender" [flexGrow]="1">
          <ng-template let-row="row" let-value="value" ngx-datatable-cell-template>
            {{ value }}
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Age" [flexGrow]="1">
          <ng-template let-value="value" ngx-datatable-cell-template>
            {{ value }}
          </ng-template>
        </ngx-datatable-column>
      </ngx-datatable>
    </div>
  `,
  styles: ['.icon {height: 10px; width: 10px; }', '.disabled {opacity: 0.5; }']
})
export class ClientSideTreeComponent {
  rows: TreeEmployee[] = [];

  private dataService = inject(DataService);

  constructor() {
    this.dataService.load('company_tree.json').subscribe(data => (this.rows = data));
  }

  onTreeAction(event: any) {
    const row = event.row;
    if (row.treeStatus === 'collapsed') {
      row.treeStatus = 'expanded';
    } else {
      row.treeStatus = 'collapsed';
    }
  }
}
