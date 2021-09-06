import { Input, Output, EventEmitter, Directive, TemplateRef, ContentChild } from '@angular/core';
import { DatatableRowDetailTemplateDirective } from './row-detail-template.directive';

@Directive({ selector: 'ngx-datatable-row-detail' })
export class DatatableRowDetailDirective {
  /**
   * The detail row height is required especially
   * when virtual scroll is enabled.
   */
  @Input() rowHeight: number | ((row?: any, index?: number) => number) = 0;

  @Input('template')
  _templateInput: TemplateRef<any>;

  @ContentChild(DatatableRowDetailTemplateDirective, { read: TemplateRef, static: true })
  _templateQuery: TemplateRef<any>;

  get template(): TemplateRef<any> {
    return this._templateInput || this._templateQuery;
  }

  /**
   * Row detail row visbility was toggled.
   */
  @Output() toggle: EventEmitter<any> = new EventEmitter();

  /**
   * Toggle the expansion of the row
   */
  toggleExpandRow(row: any): void {
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
