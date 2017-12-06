import { Component } from '@angular/core';
import { setTimeout } from 'timers';

@Component({
  selector: 'full-screen-tree-demo',
  template: `
    <div>
      <h3>
        Full Screen
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/tree/fullscreen.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material fullscreen"
        style="top: 52px"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="0"
        [rowHeight]="50"
        [scrollbarV]="true"
        [scrollbarH]="true"
        [rows]="rows"
        [treeFromRelation]="'parentId'"
        [treeToRelation]="'id'"
        (treeAction)="onTreeAction($event)">
        <ngx-datatable-column name="Id" [width]="80"></ngx-datatable-column>
        <ngx-datatable-column name="Name" [isTreeColumn]="true" [width]="300">
          <ng-template ngx-datatable-cell-tree-expander>
            <img
              [ngClass]="['icon']"
              src="https://png.icons8.com/android/540/expand-arrow.png" />
          </ng-template>

          <ng-template ngx-datatable-cell-tree-collapser>
            <img
              [ngClass]="['icon']"
              src="https://png.icons8.com/android/540/collapse-arrow.png" />
          </ng-template>

          <ng-template ngx-datatable-cell-tree-disabled>
            <img
              [ngClass]="['icon', 'disabled']"
              src="https://png.icons8.com/android/540/collapse-arrow.png" />
          </ng-template>

          <ng-template ngx-datatable-cell-tree-loader>
            <img
              [ngClass]="['icon']"
              src="http://webcast.messukeskus.com/pub/player/img/wait.gif" />
          </ng-template>

        </ngx-datatable-column>
        <ngx-datatable-column name="Gender"></ngx-datatable-column>
        <ngx-datatable-column name="Age"></ngx-datatable-column>
        <ngx-datatable-column name="City" [width]="300" prop="address.city"></ngx-datatable-column>
        <ngx-datatable-column name="State" [width]="300" prop="address.state"></ngx-datatable-column>
      </ngx-datatable>
    </div>
  `,
  styles: [
    '.icon {height: 10px; width: 10px; }',
    '.disabled {opacity: 0.5; }'
  ],
})
export class FullScreenTreeComponent {

  rows = [];
  lastIndex = 15;

  constructor() {
    this.fetch((data) => {
      data = data.slice(1, this.lastIndex);
      this.rows = data.map((d) => {
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
    console.log('The event - ', event);
    const index = event.rowIndex;
    const row = event.row;
    if (this.rows[index].treeStatus === 'collapsed') {
      this.rows[index].treeStatus = 'loading';
      this.fetch((data) => {
        data = data.slice(this.lastIndex, this.lastIndex + 3)
          .map((d) => {
            d.treeStatus = 'collapsed';
            d.parentId = row.id;
            return d;
          });
        this.lastIndex = this.lastIndex + 3;
        this.rows[index].treeStatus = 'expanded';
        this.rows = [...this.rows, ...data];
      });
    } else {
      this.rows[index].treeStatus = 'collapsed';
      this.rows = [...this.rows];
    }
  }

}
