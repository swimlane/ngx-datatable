import { Directive, TemplateRef } from '@angular/core';
import { CellContext } from '../../types/public.types';

@Directive({ selector: '[ngx-datatable-cell-template]' })
export class DataTableColumnCellDirective {
  constructor(public template: TemplateRef<any>) {}

  static ngTemplateContextGuard(dir: DataTableColumnCellDirective, ctx: any): ctx is CellContext {
    return true;
  }
}
