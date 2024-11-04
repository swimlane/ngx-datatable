import { Directive } from '@angular/core';

@Directive({
  selector: '[ngx-datatable-ghost-cell-template]',
  standalone: true
})
export class DataTableColumnGhostCellDirective {
  static ngTemplateContextGuard(
    directive: DataTableColumnGhostCellDirective,
    context: unknown
  ): context is void {
    return true;
  }
}
