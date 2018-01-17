import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[ngx-datatable-tree-icon]' })
export class DataTableColumnCellTreeIcon {
  constructor(public template: TemplateRef<any>) { }
}
