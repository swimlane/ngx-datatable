import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[ngx-datatable-sub-header-template]' })
export class DataTableColumnSubHeaderDirective {
  constructor(public template: TemplateRef<any>) { }
}
