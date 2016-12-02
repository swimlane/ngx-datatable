import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[swui-data-table-header-template]' })
export class DataTableColumnHeaderDirective {
  constructor(public template: TemplateRef<any>) { };
}
