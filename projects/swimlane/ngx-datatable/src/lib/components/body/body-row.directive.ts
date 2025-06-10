import { Directive } from '@angular/core';
import { Row } from '../../types/public.types';

@Directive({
  selector: '[ngx-datatable-body-row]'
})
export class DatatableBodyRowDirective {
  static ngTemplateContextGuard<TRow extends Row = any>(
    directive: DatatableBodyRowDirective,
    context: unknown
  ): context is {
    row: TRow;
    groupedRows: TRow[];
    index: number;
    indexInGroup?: number;
    disabled: boolean;
  } {
    return true;
  }
}
