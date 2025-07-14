import { Directive, TemplateRef, input, contentChild, computed } from '@angular/core';

import { FooterContext } from '../../types/public.types';
import { DataTableFooterTemplateDirective } from './footer-template.directive';

@Directive({
  selector: 'ngx-datatable-footer'
})
export class DatatableFooterDirective {
  readonly _templateInput = input<TemplateRef<FooterContext>>(undefined, { alias: 'template' });

  private readonly _templateQuery = contentChild(DataTableFooterTemplateDirective, {
    read: TemplateRef
  });

  readonly template = computed(() => this._templateInput() ?? this._templateQuery());
}
