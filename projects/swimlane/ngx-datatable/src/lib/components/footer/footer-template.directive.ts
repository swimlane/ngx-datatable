import { Directive } from '@angular/core';
import { FooterContext } from '../../types/public.types';

@Directive({
  selector: '[ngx-datatable-footer-template]',
  standalone: true
})
export class DataTableFooterTemplateDirective {
  static ngTemplateContextGuard(
    directive: DataTableFooterTemplateDirective,
    context: unknown
  ): context is FooterContext {
    return true;
  }
}
