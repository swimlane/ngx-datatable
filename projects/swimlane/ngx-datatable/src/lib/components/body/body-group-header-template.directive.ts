import { Directive, TemplateRef } from '@angular/core';
import { GroupContext } from '../../types/cell-context.type';

@Directive({
  selector: '[ngx-datatable-group-header-template]'
})
export class DatatableGroupHeaderTemplateDirective<TRow> {
  static ngTemplateContextGuard<TRow>(
    directive: DatatableGroupHeaderTemplateDirective<TRow>,
    context: unknown
  ): context is GroupContext<TRow> {
    return true;
  }
}
