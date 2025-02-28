import { Directive } from '@angular/core';
import { Row } from '../../types/public.types';

@Directive({
  selector: '[ngx-datatable-body-row]',
  standalone: true
})
export class DatatableBodyRowDirective {
  static ngTemplateContextGuard<TRow extends Row = any>(
    directive: DatatableBodyRowDirective,
    context: unknown
  ): context is {
    row: TRow;
    groupedRows: TRow[];
    index: number;
    disabled: boolean;
  } {
    return true;
  }
}
