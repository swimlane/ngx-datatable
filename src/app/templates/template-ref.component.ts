import { Component, inject, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { DatatableComponent, TableColumn } from 'projects/swimlane/ngx-datatable/src/public-api';

import { Employee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'template-ref-demo',
  imports: [DatatableComponent],
  template: `
    <div>
      <h3>
        TemplateRef
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/templates/template-ref.component.ts"
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
        [columns]="columns"
        [headerHeight]="50"
        [footerHeight]="50"
      />

      <ng-template #hdrTpl let-column="column">
        <strong>Fancy</strong>: {{ column.name }} !!
      </ng-template>

      <ng-template #editTmpl let-row="row" let-value="value">
        @if (value === 'male') {
          <img width="150" src="https://media.giphy.com/media/I8nepxWwlEuqI/giphy.gif" alt="" />
        }
        @if (value === 'female') {
          <img width="150" src="https://media.giphy.com/media/sxSVG3XHf7yww/giphy.gif" alt="" />
        }
      </ng-template>
    </div>
  `
})
export class TemplateRefComponent implements OnInit {
  @ViewChild('editTmpl', { static: true }) editTmpl!: TemplateRef<any>;
  @ViewChild('hdrTpl', { static: true }) hdrTpl!: TemplateRef<any>;

  readonly rows = signal<Employee[]>([]);
  columns: TableColumn[] = [];

  private dataService = inject(DataService);

  constructor() {
    this.dataService.load('company.json').subscribe(data => this.rows.set(data.splice(0, 5)));
  }

  ngOnInit() {
    this.columns = [
      {
        cellTemplate: this.editTmpl,
        headerTemplate: this.hdrTpl,
        name: 'Gender'
      }
    ];
  }
}
