import { Component, Input, OnChanges, PipeTransform, TemplateRef } from '@angular/core';

export interface ISummaryColumn {
  summaryFunc: (cells: any[]) => any;
  summaryTemplate: TemplateRef<any>;

  prop: string;
  pipe: PipeTransform;
}

function defaultSumFunc(cells: any[]): any {
  return cells
    .filter(cell => !!cell)
    .reduce((res, cell) => res + cell);
}

@Component({
  selector: 'datatable-summary-row',
  template: `
    <datatable-body-row
      tabindex="-1"
      [innerWidth]="innerWidth"
      [offsetX]="offsetX"
      [columns]="columns"
      [rowHeight]="getRowHeight(summaryRow)"
      [row]="summaryRow"
      [rowIndex]="-1">
    </datatable-body-row>
  `
})

export class DatatableSummaryRowComponent implements OnChanges {
  @Input() rows: any[];
  @Input() columns: ISummaryColumn[];

  @Input() getRowHeight: (row: any[]) => number;
  @Input() offsetX: number;
  @Input() innerWidth: number;

  summaryRow = {};

  ngOnChanges() {
    if (!this.rows || !this.rows.length) { return; }

    this.update();
  }

  private update() {
    this.summaryRow = {};

    this.columns.forEach(col => {
      const cellsFromSingleColumn = this.rows.map(row => row[col.prop]);
      const sumFunc = col.summaryFunc || defaultSumFunc;

      this.summaryRow[col.prop] = sumFunc(cellsFromSingleColumn);
    });
  }
}
