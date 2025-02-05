import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { ColumnMode } from 'projects/swimlane/ngx-datatable/src/public-api';

@Component({
  selector: 'drag-drop-demo',
  template: `
    <div>
      <h3>
        Drag Drop Using Angular CDK
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/drag-drop/drag-drop.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [rows]="rows"
        [loadingIndicator]="loadingIndicator"
        [columns]="columns"
        [columnMode]="ColumnMode.force"
        [headerHeight]="50"
        [footerHeight]="50"
        rowHeight="auto"
        [reorderable]="reorderable"
        (cdkDropListDropped)="drop($event)"
        cdkDropList
      >
        <ng-template rowDef>
          <datatable-row-def cdkDrag [cdkDragPreviewContainer]="'parent'" />
        </ng-template>
      </ngx-datatable>
    </div>
  `,
  standalone: false
})
export class DragDropComponent {
  rows = [];
  loadingIndicator = true;
  reorderable = true;

  columns = [
    { prop: 'name', sortable: false },
    { name: 'Gender', sortable: false },
    { name: 'Company', sortable: false }
  ];

  ColumnMode = ColumnMode;

  constructor() {
    this.fetch(data => {
      this.rows = data;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 1500);
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  drop(event: CdkDragDrop<any>) {
    moveItemInArray(this.rows, event.previousIndex, event.currentIndex);
    this.rows = [...this.rows];
  }
}
