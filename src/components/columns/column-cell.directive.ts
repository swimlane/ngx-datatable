import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[ngx-datatable-cell-template]' })
export class DataTableColumnCellDirective {
  constructor(public template: TemplateRef<any>) { }
}
