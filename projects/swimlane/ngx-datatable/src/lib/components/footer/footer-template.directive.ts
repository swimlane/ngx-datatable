import { Directive } from '@angular/core';
import { FooterContext } from '../../types/public.types';

@Directive({
  selector: '[ngx-datatable-footer-template]'
})
export class DataTableFooterTemplateDirective {
  static ngTemplateContextGuard(
    directive: DataTableFooterTemplateDirective,
    context: unknown
  ): context is FooterContext {
    return true;
  }
}
