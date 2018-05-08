import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[ngx-datatable-tree-toggle]' })
export class DataTableColumnCellTreeToggle {
  constructor(public template: TemplateRef<any>) { }
}
