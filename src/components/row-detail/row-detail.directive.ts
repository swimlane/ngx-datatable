import { Input, Output, EventEmitter, Directive, TemplateRef, ContentChild } from '@angular/core';
import { DatatableRowDetailTemplateDirective } from './row-detail-template.directive';

@Directive({ selector: 'ngx-datatable-row-detail' })
export class DatatableRowDetailDirective {

  /**
   * The detail row height is required especially 
   * when virtual scroll is enabled.
   * 
   * @type {number|function(row?:any,index?:number): number}
   * @memberOf DatatableComponent
   */
  @Input() rowHeight: (number | ((row?: any, index?: number) => number)) = 0;

  @Input()
  @ContentChild(DatatableRowDetailTemplateDirective, { read: TemplateRef }) 
  template: TemplateRef<any>;

  /**
   * Row detail row visbility was toggled.
   * 
   * @type {EventEmitter<any>}
   * @memberOf DatatableComponent
   */
  @Output() toggle: EventEmitter<any> = new EventEmitter();

  /**
   * Toggle the expansion of the row
   *
   * @param rowIndex
   */
  toggleExpandRow(row: any): void {
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
