import { Component, inject } from '@angular/core';
import {
  DatatableComponent,
  DatatableFooterDirective,
  DataTableFooterTemplateDirective,
  TableColumn,
  DatatablePagerComponent
} from 'projects/swimlane/ngx-datatable/src/public-api';

import { Employee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'footer-template-demo',
  imports: [
    DatatableComponent,
    DatatableFooterDirective,
    DataTableFooterTemplateDirective,
    DatatablePagerComponent
  ],
  template: `
    <div>
      <h3>
        Footer Template
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/footer-template.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        rowHeight="auto"
        columnMode="force"
        [rows]="rows"
        [columns]="columns"
        [footerHeight]="100"
        [headerHeight]="50"
      >
        <ngx-datatable-footer>
          <ng-template
            let-rowCount="rowCount"
            let-pageSize="pageSize"
            let-selectedCount="selectedCount"
            let-curPage="curPage"
            let-offset="offset"
            ngx-datatable-footer-template
          >
            <div style="padding: 5px 10px">
              <div><strong>Summary</strong>: Gender: Female</div>
              <hr style="width:100%" />
              <div
                >Rows: {{ rowCount }} | Size: {{ pageSize }} | Current: {{ curPage }} | Offset:
                {{ offset }}</div
              >
            </div>
            <ngx-datatable-pager />
          </ng-template>
        </ngx-datatable-footer>
      </ngx-datatable>
    </div>
  `
})
export class FooterTemplateComponent {
  rows: Employee[] = [];

  columns: TableColumn[] = [{ prop: 'name' }, { name: 'Gender' }, { name: 'Company' }];

  private dataService = inject(DataService);

  constructor() {
    this.dataService.load('company.json').subscribe(data => {
      this.rows = data.splice(0, 5);
    });
  }
}
