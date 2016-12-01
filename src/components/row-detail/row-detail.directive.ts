import { Directive, TemplateRef, ContentChild } from '@angular/core';
import { DatatableRowDetailTemplateDirective } from './row-detail-template.directive';

@Directive({ selector: 'swui-datatable-row-detail' })
export class DatatableRowDetailDirective {

  @ContentChild(DatatableRowDetailTemplateDirective, { read: TemplateRef }) 
  template: TemplateRef<any>;

  get rowDetailTemplate(): TemplateRef<any> {
    return this.template;
  }

}
