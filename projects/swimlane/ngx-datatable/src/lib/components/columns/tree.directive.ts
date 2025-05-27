import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ngx-datatable-tree-toggle]'
})
export class DataTableColumnCellTreeToggle {
  template = inject<TemplateRef<any>>(TemplateRef);
}
