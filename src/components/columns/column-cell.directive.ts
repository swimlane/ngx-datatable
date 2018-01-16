import { Directive, TemplateRef, Inject } from '@angular/core';

@Directive({ selector: '[ngx-datatable-cell-template]' })
export class DataTableColumnCellDirective {
  constructor(@Inject(TemplateRef) public template: TemplateRef<any>) { }
}
