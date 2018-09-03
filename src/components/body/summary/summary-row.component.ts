import { Component, Input, OnChanges, PipeTransform, TemplateRef } from '@angular/core';

export interface ISummaryColumn {
  summaryFunc?: (cells: any[]) => any;
  summaryTemplate?: TemplateRef<any>;

  prop: string;
  pipe?: PipeTransform;
}

function defaultSumFunc(cells: any[]): any {
  const cellsWithValues = cells.filter(cell => !!cell);

  if (!cellsWithValues.length) {
    return null;
  }
  if (cellsWithValues.some(cell => typeof cell !== 'number')) {
    return null;
  }

  return cellsWithValues.reduce((res, cell) => res + cell);
}

function noopSumFunc(cells: any[]): void {
  return null;
}

@Component({
  selector: 'datatable-summary-row',
  template: `
  <datatable-body-row
    *ngIf="summaryRow && _internalColumns"
    tabindex="-1"
    [innerWidth]="innerWidth"
    [offsetX]="offsetX"
    [columns]="_internalColumns"
    [rowHeight]="rowHeight"
    [row]="summaryRow"
    [rowIndex]="-1">
  </datatable-body-row>
  `,
  host: {
    class: 'datatable-summary-row'
  }
})

export class DataTableSummaryRowComponent implements OnChanges {
  @Input() rows: any[];
  @Input() columns: ISummaryColumn[];

  @Input() rowHeight: number;
  @Input() offsetX: number;
  @Input() innerWidth: number;

  _internalColumns: ISummaryColumn[];
  summaryRow = {};

  ngOnChanges() {
    if (!this.columns || !this.rows) { return; }
    this.updateInternalColumns();
    this.updateValues();
  }

  private updateInternalColumns() {
    this._internalColumns = this.columns.map(col => ({
      ...col,
      cellTemplate: col.summaryTemplate
    }));
  }

  private updateValues() {
    this.summaryRow = {};

    this.columns
      .filter(col => !col.summaryTemplate)
      .forEach(col => {
      const cellsFromSingleColumn = this.rows.map(row => row[col.prop]);
      const sumFunc = this.getSummaryFunction(col);

      this.summaryRow[col.prop] = col.pipe ?
        col.pipe.transform(sumFunc(cellsFromSingleColumn)) :
        sumFunc(cellsFromSingleColumn);
    });
  }

  private getSummaryFunction(column: ISummaryColumn): (a: any[]) => any {
    if (column.summaryFunc === undefined) {
      return defaultSumFunc;
    } else if (column.summaryFunc === null) {
      return noopSumFunc;
    } else {
      return column.summaryFunc;
    }
  }
}
