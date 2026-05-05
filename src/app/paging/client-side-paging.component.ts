import { Component, inject, signal } from '@angular/core';
import { DatatableComponent } from 'projects/swimlane/ngx-datatable/src/public-api';

import { Employee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'client-side-paging-demo',
  imports: [DatatableComponent],
  template: `
    <div>
      <h3>
        Client-side Paging
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/paging/client-side-paging.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      @let rows = this.rows();
      <ngx-datatable
        class="material"
        rowHeight="auto"
        columnMode="force"
        [rows]="rows"
        [columns]="[{ name: 'Name' }, { name: 'Gender' }, { name: 'Company' }]"
        [headerHeight]="50"
        [footerHeight]="50"
        [limit]="10"
      />
    </div>
  `
})
export class ClientSidePagingComponent {
  readonly rows = signal<Employee[]>([]);

  private dataService = inject(DataService);

  constructor() {
    this.dataService.load('company.json').subscribe(data => this.rows.set(data));
  }
}
