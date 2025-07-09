import { Component, computed, input } from '@angular/core';

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
    @let summaryRow = this.summaryRow();
    @let _internalColumns = this._internalColumns();
    @if (summaryRow && _internalColumns.length) {
      <datatable-body-row
        tabindex="-1"
        [innerWidth]="innerWidth()"
        [columns]="_internalColumns"
        [rowHeight]="rowHeight()"
        [row]="summaryRow"
        [rowIndex]="{ index: -1 }"
      />
    }
  `,
  host: {
    class: 'datatable-summary-row'
  }
})
export class DataTableSummaryRowComponent {
  readonly rows = input.required<any[]>();
  readonly columns = input.required<TableColumnInternal[]>();

  readonly rowHeight = input.required<number>();
  readonly innerWidth = input.required<number>();

  protected readonly _internalColumns = computed(() => {
    return this.columns().map(col => ({
      ...col,
      cellTemplate: col.summaryTemplate
    }));
  });
  protected readonly summaryRow = computed(() => this.computeSummaryRowValues());

  private computeSummaryRowValues() {
    if (!this.columns().length || !this.rows().length) {
      return undefined;
    }
    const summaryRow: any = {};
    this.columns()
      .filter(col => !col.summaryTemplate && col.prop)
      .forEach(col => {
        const cellsFromSingleColumn = this.rows().map(row => row[col.prop!]);
        const sumFunc = this.getSummaryFunction(col);

        summaryRow[col.prop!] = col.pipe
          ? col.pipe.transform(sumFunc(cellsFromSingleColumn))
          : sumFunc(cellsFromSingleColumn);
      });

    return summaryRow;
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
