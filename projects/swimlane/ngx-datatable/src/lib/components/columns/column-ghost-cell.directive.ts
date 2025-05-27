import { Directive } from '@angular/core';

@Directive({
  selector: '[ngx-datatable-ghost-cell-template]'
})
export class DataTableColumnGhostCellDirective {
  static ngTemplateContextGuard(
    directive: DataTableColumnGhostCellDirective,
    context: unknown
  ): context is void {
    return true;
  }
}
