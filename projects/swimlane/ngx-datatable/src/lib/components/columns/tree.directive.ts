import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ngx-datatable-tree-toggle]',
  standalone: true
})
export class DataTableColumnCellTreeToggle {
  template = inject<TemplateRef<any>>(TemplateRef);
}
