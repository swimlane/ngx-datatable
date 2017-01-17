import { Input, Directive, TemplateRef, ContentChild } from '@angular/core';
import { DatatableRowDetailTemplateDirective } from './row-detail-template.directive';

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

}
