import { Directive } from '@angular/core';
import { RowDetailContext } from '../../types/public.types';

@Directive({
  selector: '[ngx-datatable-row-detail-template]',
  standalone: true
})
export class DatatableRowDetailTemplateDirective {
  static ngTemplateContextGuard(
    directive: DatatableRowDetailTemplateDirective,
    context: unknown
  ): context is RowDetailContext {
    return true;
  }
}
