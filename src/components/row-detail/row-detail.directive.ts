import { Directive, TemplateRef, ContentChild } from '@angular/core';
import { DataTableRowDetailTemplateDirective } from './row-detail-template.directive';

@Directive({ selector: 'swui-data-table-row-detail' })
export class DataTableRowDetailDirective {

  @ContentChild(DataTableRowDetailTemplateDirective, { read: TemplateRef })
  template: TemplateRef<any>;

  get rowDetailTemplate(): TemplateRef<any> {
    return this.template;
  }

}
