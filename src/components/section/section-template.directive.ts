import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ngx-datatable-section-template]'
})
export class DatatableSectionTemplateDirective {
  constructor(public template: TemplateRef<any>) { }
}
