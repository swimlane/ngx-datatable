import { Directive, TemplateRef } from '@angular/core';
import { CellContext } from "../../types/cell-context.type";

@Directive({ selector: '[ngx-datatable-cell-template]' })
export class DataTableColumnCellDirective {
  constructor(public template: TemplateRef<any>) {}

  static ngTemplateContextGuard<TRow = any>(dir: DataTableColumnCellDirective, ctx: any): ctx is CellContext<TRow> {
    return true;
  }
}
