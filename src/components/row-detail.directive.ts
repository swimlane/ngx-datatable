import { Directive, TemplateRef, ContentChild } from '@angular/core';

@Directive({
  selector: 'datatable-row-detail-template'
})
export class DatatableRowDetailDirective {

  @ContentChild(TemplateRef) template: TemplateRef<any>;

  get rowDetailTemplate(): TemplateRef<any> {
    return this.template;
  }

}
