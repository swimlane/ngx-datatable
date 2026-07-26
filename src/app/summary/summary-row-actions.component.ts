import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  DataTableColumnDirective,
  DatatableComponent,
  DatatableSummaryRowDirective
} from 'projects/swimlane/ngx-datatable/src/public-api';

import { Employee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'summary-row-actions-demo',
  imports: [DatatableComponent, DataTableColumnDirective, DatatableSummaryRowDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div>
      <h3>
        Summary Row Actions
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/summary/summary-row-actions.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      @let rows = this.rows();
      <ngx-datatable
        class="material selection-row"
        rowHeight="auto"
        summaryHeight="auto"
        columnMode="force"
        selectionType="checkbox"
        [rows]="rows"
        [headerHeight]="50"
        [footerHeight]="50"
        [limit]="10"
        [(selected)]="selected"
      >
        @if (selected().length) {
          <ng-template ngx-datatable-summary-row>
            <div class="summary-row-actions-bar">
              <span class="summary-row-actions-count">{{ selected().length }} row(s) selected</span>
              <div class="summary-row-actions-buttons">
                <button type="button" (click)="onExport()">Export</button>
                <button type="button" (click)="onDelete()">Delete</button>
                <button type="button" (click)="onCancel()">Cancel</button>
              </div>
            </div>
          </ng-template>
        }
        <ngx-datatable-column
          [width]="30"
          [sortable]="false"
          [canAutoResize]="false"
          [draggable]="false"
          [resizeable]="false"
          [headerCheckboxable]="true"
          [checkboxable]="true"
        />
        <ngx-datatable-column name="Name" />
        <ngx-datatable-column name="Gender" />
        <ngx-datatable-column name="Company" />
      </ngx-datatable>
    </div>
  `,
  styles: `
    .summary-row-actions-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .summary-row-actions-buttons {
      display: flex;
      gap: 8px;
    }
  `
})
export class SummaryRowActionsComponent {
  protected readonly rows = signal<Employee[]>([]);
  protected readonly selected = signal<Employee[]>([]);

  private dataService = inject(DataService);

  constructor() {
    this.dataService.load('company.json').subscribe(data => this.rows.set(data));
  }

  protected onExport() {
    alert(`Exporting ${this.selected().length} row(s)`);
  }

  protected onDelete() {
    const names = this.selected().map(r => r.name);
    this.rows.update(rows => rows.filter(r => !names.includes(r.name)));
    this.selected.set([]);
  }

  protected onCancel() {
    this.selected.set([]);
  }
}
