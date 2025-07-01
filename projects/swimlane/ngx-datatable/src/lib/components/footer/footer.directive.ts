import { ContentChild, Directive, Input, TemplateRef } from '@angular/core';

import { FooterContext } from '../../types/public.types';
import { DataTableFooterTemplateDirective } from './footer-template.directive';

@Directive({
  selector: 'ngx-datatable-footer'
})
export class DatatableFooterDirective {
  @Input('template')
  _templateInput?: TemplateRef<FooterContext>;

  @ContentChild(DataTableFooterTemplateDirective, { read: TemplateRef })
  _templateQuery?: TemplateRef<FooterContext>;

  get template(): TemplateRef<FooterContext> | undefined {
    return this._templateInput ?? this._templateQuery;
  }
}
