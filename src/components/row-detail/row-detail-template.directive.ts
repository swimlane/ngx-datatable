import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[swui-datatable-row-detail-template]'
})
export class DatatableRowDetailTemplateDirective {
  constructor(public template: TemplateRef<any>) { };
}
