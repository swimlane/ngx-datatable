import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, inject, signal } from '@angular/core';
import {
  DatatableComponent,
  DatatableRowDefComponent,
  DatatableRowDefDirective
} from 'projects/swimlane/ngx-datatable/src/public-api';

import { Employee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'drag-drop-demo',
  imports: [
    DatatableComponent,
    CdkDropList,
    DatatableRowDefDirective,
    DatatableRowDefComponent,
    CdkDrag
  ],
  template: `
    <div>
      <h3>
        Drag Drop
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
        rowHeight="auto"
        cdkDropList
        columnMode="force"
        [rows]="rows()"
        [loadingIndicator]="loadingIndicator()"
        [columns]="columns"
        [headerHeight]="50"
        [footerHeight]="50"
        [reorderable]="reorderable"
        (cdkDropListDropped)="drop($event)"
      >
        <ng-template rowDef>
          <datatable-row-def cdkDrag cdkDragPreviewContainer="parent" />
        </ng-template>
      </ngx-datatable>
    </div>
  `
})
export class DragDropComponent {
  readonly rows = signal<Employee[]>([]);
  readonly loadingIndicator = signal<boolean>(true);
  reorderable = true;

  columns = [
    { prop: 'name', sortable: false },
    { name: 'Gender', sortable: false },
    { name: 'Company', sortable: false }
  ];

  private dataService = inject(DataService);

  constructor() {
    this.dataService.load('company.json').subscribe(data => {
      this.rows.set(data);
      setTimeout(() => {
        this.loadingIndicator.set(false);
      }, 1500);
    });
  }

  drop(event: CdkDragDrop<any>) {
    this.rows.update(currentRows => {
      const updatedRows = [...currentRows];
      moveItemInArray(updatedRows, event.previousIndex, event.currentIndex);
      return updatedRows;
    });
  }
}
