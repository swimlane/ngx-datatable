import { Component } from '@angular/core';
import { DatatableComponent, TableColumn } from 'projects/swimlane/ngx-datatable/src/public-api';

@Component({
  selector: 'empty-template-demo',
  imports: [DatatableComponent],
  template: `
    <div>
      <h3>
        Empty Template
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/main/src/app/basic/empty-template.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        columnMode="force"
        [rows]="[]"
        [columns]="columns"
        [headerHeight]="50"
        [footerHeight]="50"
      >
        <div empty-content style="text-align: center;"
          >My custom empty component<br />uses two lines.</div
        >
      </ngx-datatable>
    </div>
  `
})
export class EmptyTemplateComponent {
  columns: TableColumn[] = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company', sortable: false }
  ];
}
