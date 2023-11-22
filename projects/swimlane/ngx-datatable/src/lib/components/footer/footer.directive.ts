import { Input, Directive, TemplateRef, ContentChild } from '@angular/core';
import { DataTableFooterTemplateDirective } from './footer-template.directive';

@Directive({ selector: 'ngx-datatable-footer' })
export class DatatableFooterDirective {
  @Input('template')
  _templateInput: TemplateRef<any>;

  @ContentChild(DataTableFooterTemplateDirective, { read: TemplateRef })
  _templateQuery: TemplateRef<any>;

  get template(): TemplateRef<any> {
    return this._templateInput || this._templateQuery;
  }
}
