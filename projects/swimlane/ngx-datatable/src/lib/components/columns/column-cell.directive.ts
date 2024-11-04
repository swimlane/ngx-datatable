import { Directive, inject, TemplateRef } from '@angular/core';
import { CellContext } from '../../types/public.types';

@Directive({
  selector: '[ngx-datatable-cell-template]',
  standalone: true
})
export class DataTableColumnCellDirective {
  template = inject<TemplateRef<CellContext>>(TemplateRef);

  static ngTemplateContextGuard(dir: DataTableColumnCellDirective, ctx: any): ctx is CellContext {
    return true;
  }
}
