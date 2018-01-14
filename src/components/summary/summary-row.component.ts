import { Component, Input, TemplateRef } from '@angular/core';

export interface ISummaryColumn {
  summaryFunc: (cells: any[]) => any;
  summaryTemplate: TemplateRef<any>;
}

@Component({
  selector: 'datatable-summary-row',
  template: `
    SUMMARY ROW
  `
})

export class DatatableSummaryRowComponent {
  @Input() rows: any[] = [];
  @Input() columns: ISummaryColumn;
}
