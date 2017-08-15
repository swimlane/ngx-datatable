import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ngx-datatable-section-header-template]'
})
export class DatatableSectionHeaderTemplateDirective {
  constructor(public template: TemplateRef<any>) { }
}
