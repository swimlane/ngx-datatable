import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[ngx-datatable-footer-template]' })
export class DataTableFooterTemplateDirective {
  constructor(public template: TemplateRef<any>) { }
}
