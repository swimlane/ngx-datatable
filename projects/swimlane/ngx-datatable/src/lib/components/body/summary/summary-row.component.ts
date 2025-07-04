import { Component, Input, OnChanges } from '@angular/core';

import { TableColumnInternal } from '../../../types/internal.types';
import { DataTableBodyRowComponent } from '../body-row.component';

const defaultSumFunc = (cells: any[]): any => {
  const cellsWithValues = cells.filter(cell => !!cell);

  if (!cellsWithValues.length) {
    return null;
  }
  if (cellsWithValues.some(cell => typeof cell !== 'number')) {
    return null;
  }

  return cellsWithValues.reduce((res, cell) => res + cell);
};

const noopSumFunc = (cells: any[]): void => {
  return;
};

@Component({
  selector: 'datatable-summary-row',
  imports: [DataTableBodyRowComponent],
  template: `
    @if (summaryRow && _internalColumns) {
      <datatable-body-row
        tabindex="-1"
        [innerWidth]="innerWidth"
        [columns]="_internalColumns"
        [rowHeight]="rowHeight"
        [row]="summaryRow"
        [rowIndex]="{ index: -1 }"
      />
    }
  `,
  host: {
    class: 'datatable-summary-row'
  }
})
export class DataTableSummaryRowComponent implements OnChanges {
  @Input() rows!: any[];
  @Input() columns!: TableColumnInternal[];

  @Input() rowHeight!: number;
  @Input() innerWidth!: number;

  _internalColumns!: TableColumnInternal[];
  summaryRow: any = {};

  ngOnChanges() {
    if (!this.columns.length || !this.rows.length) {
      return;
    }
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
      .filter(col => !col.summaryTemplate && col.prop)
      .forEach(col => {
        const cellsFromSingleColumn = this.rows.map(row => row[col.prop!]);
        const sumFunc = this.getSummaryFunction(col);

        this.summaryRow[col.prop!] = col.pipe
          ? col.pipe.transform(sumFunc(cellsFromSingleColumn))
          : sumFunc(cellsFromSingleColumn);
      });
  }

  private getSummaryFunction(column: TableColumnInternal): (a: any[]) => any {
    if (column.summaryFunc === undefined) {
      return defaultSumFunc;
    } else if (column.summaryFunc === null) {
      return noopSumFunc;
    } else {
      return column.summaryFunc;
    }
  }
}
