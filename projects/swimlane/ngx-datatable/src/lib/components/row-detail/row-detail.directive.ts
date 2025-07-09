import { computed, contentChild, Directive, input, output, TemplateRef } from '@angular/core';

import { DetailToggleEvents, Row, RowDetailContext } from '../../types/public.types';
import { DatatableRowDetailTemplateDirective } from './row-detail-template.directive';

@Directive({
  selector: 'ngx-datatable-row-detail'
})
export class DatatableRowDetailDirective<TRow extends Row = any> {
  /**
   * The detail row height is required especially
   * when virtual scroll is enabled.
   */
  readonly rowHeight = input<number | ((row?: TRow, index?: number) => number)>(0);

  readonly _templateInput = input<TemplateRef<RowDetailContext<TRow>>>(undefined, {
    alias: 'template'
  });

  readonly _templateQuery = contentChild(DatatableRowDetailTemplateDirective, {
    read: TemplateRef
  });

  readonly template = computed<TemplateRef<RowDetailContext<TRow>> | undefined>(() => {
    return this._templateInput() ?? this._templateQuery();
  });

  /**
   * Row detail row visbility was toggled.
   */
  readonly toggle = output<DetailToggleEvents<TRow>>();

  /**
   * Toggle the expansion of the row
   */
  toggleExpandRow(row: TRow): void {
    this.toggle.emit({
      type: 'row',
      value: row
    });
  }

  /**
   * API method to expand all the rows.
   */
  expandAllRows(): void {
    this.toggle.emit({
      type: 'all',
      value: true
    });
  }

  /**
   * API method to collapse all the rows.
   */
  collapseAllRows(): void {
    this.toggle.emit({
      type: 'all',
      value: false
    });
  }
}
