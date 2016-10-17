import { Directive, TemplateRef, ContentChild } from '@angular/core';

@Directive({
  selector: 'datatable-row-detail-template'
})
export class DatatableRowDetailTemplate {

  @ContentChild(TemplateRef) template: TemplateRef<any>;

  get rowDetailTemplate(): TemplateRef<any> {
    return this.template;
  }

}
