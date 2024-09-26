import { Directive, TemplateRef } from '@angular/core';
import { GroupContext } from '../../types/cell-context.type';

@Directive({
  selector: '[ngx-datatable-group-header-template]'
})
export class DatatableGroupHeaderTemplateDirective {
  static ngTemplateContextGuard<TRow = any>(
    directive: DatatableGroupHeaderTemplateDirective,
    context: unknown
  ): context is GroupContext<TRow> {
    return true;
  }
}
