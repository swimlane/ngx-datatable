import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ngx-datatable-row-group-template]'
})
export class DatatableRowGroupTemplateDirective {
  constructor(public template: TemplateRef<any>) { }
}
