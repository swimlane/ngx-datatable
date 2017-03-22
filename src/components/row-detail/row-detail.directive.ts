import { Input, Output, EventEmitter, Directive, TemplateRef, ContentChild } from '@angular/core';
import { DatatableRowDetailTemplateDirective } from './row-detail-template.directive';
import { RowMeta } from '../../types/';

@Directive({ selector: 'ngx-datatable-row-detail' })
export class DatatableRowDetailDirective {

  /**
   * The detail row height is required especially 
   * when virtual scroll is enabled.
   * 
   * @type {number}
   * @memberOf DatatableComponent
   */
  @Input() rowHeight: number = 0;

  @Input()
  @ContentChild(DatatableRowDetailTemplateDirective, { read: TemplateRef }) 
  template: TemplateRef<any>;

  /**
   * Row detail row visbility was toggled.
   * 
   * @type {EventEmitter<any>}
   * @memberOf DatatableComponent
   */
  @Output() toggle: EventEmitter<{type: 'row' | 'all', value: RowMeta | boolean}> = new EventEmitter();

  /**
   * Toggle the expansion of the row
   *
   * @param rowIndex
   */
  toggleExpandRow(row: RowMeta): void {
    this.toggle.emit({
      type: 'row',
      value: row
    });
  }

  /**
   * API method to expand all the rows.
   * 
   * @memberOf DatatableComponent
   */
  expandAllRows(): void {
    this.toggle.emit({
      type: 'all',
      value: true
    });
  }

  /**
   * API method to collapse all the rows.
   * 
   * @memberOf DatatableComponent
   */
  collapseAllRows(): void {
    this.toggle.emit({
      type: 'all',
      value: false
    });
  }

}
