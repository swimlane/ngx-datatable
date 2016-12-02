import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[swui-data-table-cell-template]' })
export class DataTableColumnCellDirective {
  constructor(public template: TemplateRef<any>) { };
}
