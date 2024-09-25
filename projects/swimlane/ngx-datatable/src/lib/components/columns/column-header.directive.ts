import { Directive } from '@angular/core';
import { HeaderCellContext } from '../../types/cell-context.type';

@Directive({ selector: '[ngx-datatable-header-template]' })
export class DataTableColumnHeaderDirective {
  static ngTemplateContextGuard(
    directive: DataTableColumnHeaderDirective,
    context: unknown
  ): context is HeaderCellContext {
    return true;
  }
}
