import { Directive } from '@angular/core';
import { GroupContext } from '../../types/public.types';

@Directive({
  selector: '[ngx-datatable-group-header-template]'
})
export class DatatableGroupHeaderTemplateDirective {
  static ngTemplateContextGuard(
    directive: DatatableGroupHeaderTemplateDirective,
    context: unknown
  ): context is GroupContext {
    return true;
  }
}
