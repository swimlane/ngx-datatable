import { ContentChild, Directive, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { DatatableRowDetailTemplateDirective } from './row-detail-template.directive';
import { DetailToggleEvents, Row, RowDetailContext } from '../../types/public.types';

@Directive({
  selector: 'ngx-datatable-row-detail'
})
export class DatatableRowDetailDirective<TRow extends Row = any> {
  /**
   * The detail row height is required especially
   * when virtual scroll is enabled.
   */
  @Input() rowHeight: number | ((row?: TRow, index?: number) => number) = 0;

  @Input('template')
  _templateInput?: TemplateRef<RowDetailContext<TRow>>;

  @ContentChild(DatatableRowDetailTemplateDirective, { read: TemplateRef, static: true })
  _templateQuery?: TemplateRef<RowDetailContext<TRow>>;

  get template(): TemplateRef<RowDetailContext<TRow>> | undefined {
    return this._templateInput || this._templateQuery;
  }

  /**
   * Row detail row visbility was toggled.
   */
  @Output() toggle = new EventEmitter<DetailToggleEvents<TRow>>();

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
