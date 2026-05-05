import { Component, inject, signal, ViewChild } from '@angular/core';
import {
  DataTableColumnDirective,
  DatatableComponent
} from 'projects/swimlane/ngx-datatable/src/public-api';

import { Employee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'live-data-demo',
  imports: [DatatableComponent, DataTableColumnDirective],
  template: `
    <div>
      <h3>
        Live Data
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/live-data.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
        <small>
          <a href="javascript:void(0)" (click)="start()">Start</a> |
          <a href="javascript:void(0)" (click)="stop()">Stop</a> |
          <a href="javascript:void(0)" (click)="add()">Add</a> |
          <a href="javascript:void(0)" (click)="remove()">Remove</a>
        </small>
      </h3>
      @let rows = this.rows();
      <ngx-datatable
        #mydatatable
        class="material"
        rowHeight="auto"
        columnMode="force"
        trackByProp="updated"
        [headerHeight]="50"
        [limit]="5"
        [footerHeight]="50"
        [rows]="rows"
      >
        <ngx-datatable-column name="Name" />
        <ngx-datatable-column name="Gender" />
        <ngx-datatable-column name="Company" />
      </ngx-datatable>
    </div>
  `
})
export class LiveDataComponent {
  @ViewChild('mydatatable') mydatatable!: DatatableComponent<Employee & { updated: string }>;

  count = 50;
  readonly rows = signal<(Employee & { updated: string })[]>([]);
  active = true;
  temp: (Employee & { updated: string })[] = [];
  cols = ['name', 'gender', 'company'] as const;

  private dataService = inject(DataService);

  constructor() {
    this.dataService.load('company.json').subscribe(data => {
      this.rows.set(
        data.map(d => ({
          ...d,
          updated: Date.now().toString()
        }))
      );

      this.temp = [...this.rows()];
    });

    this.start();
  }

  randomNum(start: number, end: number): number {
    return Math.floor(Math.random() * end) + start;
  }

  start(): void {
    if (!this.active) {
      return;
    }

    setTimeout(this.updateRandom.bind(this), 50);
  }

  stop(): void {
    this.active = false;
  }

  add() {
    this.rows.update(currentRows => [this.temp[this.count++], ...currentRows]);
  }

  remove() {
    this.rows.set([]);
  }

  updateRandom() {
    const rowNum = this.randomNum(0, 5);
    const cellNum = this.randomNum(0, 3);
    const newRow = this.randomNum(0, 100);
    const prop = this.cols[cellNum];
    const rows = this.rows();

    if (rows.length) {
      const row = rows[rowNum];
      row[prop] = rows[newRow][prop];
      row.updated = Date.now().toString();
    }

    this.rows.set([...rows]);

    // this.cd.markForCheck();
    // this.mydatatable.update();
    this.start();
  }
}
