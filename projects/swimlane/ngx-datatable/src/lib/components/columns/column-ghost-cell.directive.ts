import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[ngx-datatable-ghost-cell-template]' })
export class DataTableColumnGhostCellDirective {
  constructor(public template: TemplateRef<any>) {}
}
