import { Component, inject, signal } from '@angular/core';
import {
  DataTableColumnCellTreeToggle,
  DataTableColumnDirective,
  DatatableComponent,
  TreeStatus
} from '@siemens/ngx-datatable';

import { FullEmployee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'full-screen-tree-demo',
  imports: [DatatableComponent, DataTableColumnDirective, DataTableColumnCellTreeToggle],
  template: `
    <div>
      <h3>
        Full Screen
        <small>
          <a
            href="https://github.com/siemens/ngx-datatable/blob/main/src/app/tree/fullscreen.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      @let rows = this.rows();
      <ngx-datatable
        class="material fullscreen"
        style="top: 52px"
        columnMode="force"
        treeFromRelation="parentId"
        treeToRelation="id"
        [headerHeight]="50"
        [footerHeight]="0"
        [rowHeight]="50"
        [scrollbarV]="true"
        [scrollbarH]="true"
        [rows]="rows"
        (treeAction)="onTreeAction($event)"
      >
        <ngx-datatable-column name="Id" [width]="80" />
        <ngx-datatable-column
          name="Name"
          [isTreeColumn]="true"
          [width]="300"
          [treeLevelIndent]="20"
        >
          <ng-template let-tree="cellContext" ngx-datatable-tree-toggle>
            <button
              type="button"
              [disabled]="tree.treeStatus === 'disabled'"
              (click)="tree.onTreeAction()"
            >
              @if (tree.treeStatus === 'loading') {
                <span> ... </span>
              }
              @if (tree.treeStatus === 'collapsed') {
                <span> ↑ </span>
              }
              @if (tree.treeStatus === 'expanded') {
                <span> ↓ </span>
              }
              @if (tree.treeStatus === 'disabled') {
                <span> ⃠ </span>
              }
            </button>
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Gender" />
        <ngx-datatable-column name="Age" />
        <ngx-datatable-column name="City" prop="address.city" [width]="300" />
        <ngx-datatable-column name="State" prop="address.state" [width]="300" />
      </ngx-datatable>
    </div>
  `,
  styles: ['.icon {height: 10px; width: 10px; }', '.disabled {opacity: 0.5; }']
})
export class FullScreenTreeComponent {
  readonly rows = signal<(FullEmployee & { treeStatus: TreeStatus; parentId?: string })[]>([]);
  lastIndex = 15;
  private dataService = inject(DataService);

  constructor() {
    this.dataService.load('100k.json').subscribe(data => {
      data = data.slice(1, this.lastIndex);
      this.rows.set(
        data.map(d => ({
          ...d,
          treeStatus: 'collapsed' as const
        }))
      );
    });
  }

  onTreeAction(event: any) {
    const row = event.row;
    if (row.treeStatus === 'collapsed') {
      row.treeStatus = 'loading';
      this.dataService.load('100k.json').subscribe(data => {
        const newData = data.slice(this.lastIndex, this.lastIndex + 3).map(d => ({
          ...d,
          treeStatus: 'collapsed' as const,
          parentId: row.id
        }));
        this.lastIndex = this.lastIndex + 3;
        row.treeStatus = 'expanded';
        this.rows.set([...this.rows(), ...newData]);
      });
    } else {
      row.treeStatus = 'collapsed';
    }
  }
}
