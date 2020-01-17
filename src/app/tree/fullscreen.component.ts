import { Component, ChangeDetectorRef } from '@angular/core';
import { ColumnMode } from 'projects/swimlane/ngx-datatable/src/public-api';

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
        <ngx-datatable-column name="Name" [isTreeColumn]="true" [width]="300" [treeLevelIndent]="20">
          <ng-template ngx-datatable-tree-toggle let-tree="cellContext">
            <button [disabled]="tree.treeStatus === 'disabled'" (click)="tree.onTreeAction()">
              <span *ngIf="tree.treeStatus === 'loading'">
                ...
              </span>
              <span *ngIf="tree.treeStatus === 'collapsed'">
                ↑
              </span>
              <span *ngIf="tree.treeStatus === 'expanded'">
                ↓
              </span>
              <span *ngIf="tree.treeStatus === 'disabled'">
                ⃠
              </span>
            </button>
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Gender"></ngx-datatable-column>
        <ngx-datatable-column name="Age"></ngx-datatable-column>
        <ngx-datatable-column name="City" [width]="300" prop="address.city"></ngx-datatable-column>
        <ngx-datatable-column name="State" [width]="300" prop="address.state"></ngx-datatable-column>
      </ngx-datatable>
    </div>
  `,
  styles: ['.icon {height: 10px; width: 10px; }', '.disabled {opacity: 0.5; }']
})
export class FullScreenTreeComponent {
  rows = [];
  lastIndex = 15;

  ColumnMode = ColumnMode;

  constructor(private cd: ChangeDetectorRef) {
    this.fetch(data => {
      data = data.slice(1, this.lastIndex);
      this.rows = data.map(d => {
        d.treeStatus = 'collapsed';
        d.parentId = null;
        return d;
      });
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      setTimeout(() => {
        cb(JSON.parse(req.response));
      }, 500);
    };

    req.send();
  }

  onTreeAction(event: any) {
    const index = event.rowIndex;
    const row = event.row;
    if (row.treeStatus === 'collapsed') {
      row.treeStatus = 'loading';
      this.fetch(data => {
        data = data.slice(this.lastIndex, this.lastIndex + 3).map(d => {
          d.treeStatus = 'collapsed';
          d.parentId = row.id;
          return d;
        });
        this.lastIndex = this.lastIndex + 3;
        row.treeStatus = 'expanded';
        this.rows = [...this.rows, ...data];
        this.cd.detectChanges();
      });
    } else {
      row.treeStatus = 'collapsed';
      this.rows = [...this.rows];
      this.cd.detectChanges();
    }
  }
}
