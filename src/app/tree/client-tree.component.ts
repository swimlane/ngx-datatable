import { Component, inject } from '@angular/core';
import {
  DataTableColumnCellDirective,
  DataTableColumnDirective,
  DatatableComponent
} from '@siemens/ngx-datatable';

import { TreeEmployee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'client-side-tree-demo',
  imports: [DatatableComponent, DataTableColumnDirective, DataTableColumnCellDirective],
  template: `
    <div>
      <h3>
        Flex Column Width Distribution
        <small>
          <a
            href="https://github.com/siemens/ngx-datatable/blob/main/src/app/tree/client-tree.component.ts"
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
export class ClientTreeComponent {
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
