import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[swui-data-table-row-detail-template]'
})
export class DataTableRowDetailTemplateDirective {
  constructor(public template: TemplateRef<any>) { };
}
