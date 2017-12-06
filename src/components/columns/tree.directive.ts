import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[ngx-datatable-cell-tree-expander]' })
export class DataTableColumnCellTreeExpander {
  constructor(public template: TemplateRef<any>) { }
}

@Directive({ selector: '[ngx-datatable-cell-tree-collapser]' })
export class DataTableColumnCellTreeCollapser {
  constructor(public template: TemplateRef<any>) { }
}

@Directive({ selector: '[ngx-datatable-cell-tree-loader]' })
export class DataTableColumnCellTreeLoader {
  constructor(public template: TemplateRef<any>) { }
}

@Directive({ selector: '[ngx-datatable-cell-tree-disabled]' })
export class DataTableColumnCellTreeDisable {
  constructor(public template: TemplateRef<any>) { }
}
