import { Component, Input, OnChanges, PipeTransform, TemplateRef } from '@angular/core';
import { TableColumn, TableColumnProp } from '../../../types/table-column.type';
import { DataTableBodyRowComponent } from '../body-row.component';

export interface ISummaryColumn {
  summaryFunc?: (cells: any[]) => any;
  summaryTemplate?: TemplateRef<any>;

  prop?: TableColumnProp;
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
    @if (summaryRow && _internalColumns) {
    <datatable-body-row
      tabindex="-1"
      [innerWidth]="innerWidth"
      [offsetX]="offsetX"
      [columns]="_internalColumns"
      [rowHeight]="rowHeight"
      [row]="summaryRow"
      [rowIndex]="-1"
    >
    </datatable-body-row>
    }
  `,
  host: {
    class: 'datatable-summary-row'
  },
  imports: [DataTableBodyRowComponent]
})
export class DataTableSummaryRowComponent implements OnChanges {
  @Input() rows: any[];
  @Input() columns: TableColumn[];

  @Input() rowHeight: number;
  @Input() offsetX: number;
  @Input() innerWidth: number;

  _internalColumns: ISummaryColumn[];
  summaryRow: any = {};

  ngOnChanges() {
    if (!this.columns || !this.rows) {
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
      .filter(col => !col.summaryTemplate)
      .forEach(col => {
        const cellsFromSingleColumn = this.rows.map(row => row[col.prop]);
        const sumFunc = this.getSummaryFunction(col);

        this.summaryRow[col.prop] = col.pipe
          ? col.pipe.transform(sumFunc(cellsFromSingleColumn))
          : sumFunc(cellsFromSingleColumn);
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
