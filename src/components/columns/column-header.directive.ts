import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[ngx-datatable-header-template]' })
export class DataTableColumnHeaderDirective {
  constructor(public template: TemplateRef<any>) { }
}
