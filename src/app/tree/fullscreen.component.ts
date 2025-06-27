import { ChangeDetectorRef, Component } from '@angular/core';
import {
  ColumnMode,
  DataTableColumnCellTreeToggle,
  DataTableColumnDirective,
  DatatableComponent,
  TreeStatus
} from 'projects/swimlane/ngx-datatable/src/public-api';
import { FullEmployee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'full-screen-tree-demo',
  template: `
    <div>
      <h3>
        Full Screen
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/tree/fullscreen.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material fullscreen"
        style="top: 52px"
        [columnMode]="ColumnMode.force"
        [headerHeight]="50"
        [footerHeight]="0"
        [rowHeight]="50"
        [scrollbarV]="true"
        [scrollbarH]="true"
        [rows]="rows"
        [treeFromRelation]="'parentId'"
        [treeToRelation]="'id'"
        (treeAction)="onTreeAction($event)"
      >
        <ngx-datatable-column name="Id" [width]="80"></ngx-datatable-column>
        <ngx-datatable-column
          name="Name"
          [isTreeColumn]="true"
          [width]="300"
          [treeLevelIndent]="20"
        >
          <ng-template ngx-datatable-tree-toggle let-tree="cellContext">
            <button [disabled]="tree.treeStatus === 'disabled'" (click)="tree.onTreeAction()">
              @if (tree.treeStatus === 'loading') {
              <span> ... </span>
              } @if (tree.treeStatus === 'collapsed') {
              <span> ↑ </span>
              } @if (tree.treeStatus === 'expanded') {
              <span> ↓ </span>
              } @if (tree.treeStatus === 'disabled') {
              <span> ⃠ </span>
              }
            </button>
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Gender"></ngx-datatable-column>
        <ngx-datatable-column name="Age"></ngx-datatable-column>
        <ngx-datatable-column name="City" [width]="300" prop="address.city"></ngx-datatable-column>
        <ngx-datatable-column
          name="State"
          [width]="300"
          prop="address.state"
        ></ngx-datatable-column>
      </ngx-datatable>
    </div>
  `,
  styles: ['.icon {height: 10px; width: 10px; }', '.disabled {opacity: 0.5; }'],
  imports: [DatatableComponent, DataTableColumnDirective, DataTableColumnCellTreeToggle]
})
export class FullScreenTreeComponent {
  rows: (FullEmployee & { treeStatus: TreeStatus; parentId?: string })[] = [];
  lastIndex = 15;

  ColumnMode = ColumnMode;

  constructor(private cd: ChangeDetectorRef, private dataService: DataService) {
    this.dataService.load('100k.json').subscribe(data => {
      data = data.slice(1, this.lastIndex);
      this.rows = data.map(d => ({
        ...d,
        treeStatus: 'collapsed' as const
      }));
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
        this.rows = [...this.rows, ...newData];
        this.cd.detectChanges();
      });
    } else {
      row.treeStatus = 'collapsed';
      this.rows = [...this.rows];
      this.cd.detectChanges();
    }
  }
}
