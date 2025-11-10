import {
  booleanAttribute,
  computed,
  contentChild,
  Directive,
  input,
  numberAttribute,
  PipeTransform,
  Signal,
  TemplateRef
} from '@angular/core';

import { CellContext, HeaderCellContext, Row } from '../../types/public.types';
import { TableColumn, TableColumnProp } from '../../types/table-column.type';
import { DataTableColumnCellDirective } from './column-cell.directive';
import { DataTableColumnGhostCellDirective } from './column-ghost-cell.directive';
import { DataTableColumnHeaderDirective } from './column-header.directive';
import { DataTableColumnCellTreeToggle } from './tree.directive';

@Directive({
  selector: 'ngx-datatable-column'
})
export class DataTableColumnDirective<TRow extends Row> {
  readonly name = input<string>();
  readonly prop = input<TableColumnProp>();
  readonly bindAsUnsafeHtml = input(false, { transform: booleanAttribute });
  readonly frozenLeft = input(false, { transform: booleanAttribute });
  readonly frozenRight = input(false, { transform: booleanAttribute });
  readonly flexGrow = input<number, number | string | undefined>(undefined, {
    transform: numberAttribute
  });
  readonly resizeable = input<boolean, boolean | string | undefined>(undefined, {
    transform: booleanAttribute
  });
  readonly comparator = input<
    | ((valueA: any, valueB: any, rowA: TRow, rowB: TRow, sortDir: 'desc' | 'asc') => number)
    | undefined
  >();
  readonly pipe = input<PipeTransform | undefined>();
  readonly sortable = input<boolean, boolean | string | undefined>(undefined, {
    transform: booleanAttribute
  });
  readonly draggable = input<boolean, boolean | string | undefined>(undefined, {
    transform: booleanAttribute
  });
  readonly canAutoResize = input<boolean, boolean | string | undefined>(undefined, {
    transform: booleanAttribute
  });
  readonly minWidth = input<number, number | string | undefined>(undefined, {
    transform: numberAttribute
  });
  readonly width = input<number, number | string | undefined>(undefined, {
    transform: numberAttribute
  });
  readonly maxWidth = input<number, number | string | undefined>(undefined, {
    transform: numberAttribute
  });
  readonly checkboxable = input(false, { transform: booleanAttribute });
  readonly headerCheckboxable = input(false, { transform: booleanAttribute });
  readonly headerClass = input<
    string | ((data: { column: TableColumn }) => string | Record<string, boolean>) | undefined
  >();
  readonly cellClass = input<
    | string
    | ((data: {
        row: TRow;
        group?: TRow[];
        column: TableColumn<TRow>;
        value: any;
        rowHeight: number;
      }) => string | Record<string, boolean>)
    | undefined
  >();
  readonly isTreeColumn = input(false, { transform: booleanAttribute });
  readonly treeLevelIndent = input<number | undefined>();
  readonly summaryFunc = input<((cells: any[]) => any) | undefined>();
  readonly summaryTemplate = input<TemplateRef<any> | undefined>();

  readonly cellTemplateInput = input<TemplateRef<CellContext<TRow>> | undefined>(undefined, {
    alias: 'cellTemplate'
  });
  readonly cellTemplateQuery = contentChild(DataTableColumnCellDirective, { read: TemplateRef });

  readonly headerTemplateInput = input<TemplateRef<HeaderCellContext> | undefined>(undefined, {
    alias: 'headerTemplate'
  });
  readonly headerTemplateQuery = contentChild(DataTableColumnHeaderDirective, {
    read: TemplateRef
  });

  readonly treeToggleTemplateInput = input<TemplateRef<any> | undefined>(undefined, {
    alias: 'treeToggleTemplate'
  });
  readonly treeToggleTemplateQuery = contentChild(DataTableColumnCellTreeToggle, {
    read: TemplateRef
  });

  readonly ghostCellTemplateInput = input<TemplateRef<void> | undefined>(undefined, {
    alias: 'ghostCellTemplate'
  });
  readonly ghostCellTemplateQuery = contentChild(DataTableColumnGhostCellDirective, {
    read: TemplateRef
  });

  /**
   * Computed property that returns the column configuration as a TableColumn object
   */
  readonly column: Signal<TableColumn<TRow>> = computed(() => ({
    name: this.name(),
    prop: this.prop(),
    bindAsUnsafeHtml: this.bindAsUnsafeHtml(),
    frozenLeft: this.frozenLeft(),
    frozenRight: this.frozenRight(),
    flexGrow: this.flexGrow(),
    resizeable: this.resizeable(),
    comparator: this.comparator(),
    pipe: this.pipe(),
    sortable: this.sortable(),
    draggable: this.draggable(),
    canAutoResize: this.canAutoResize(),
    minWidth: this.minWidth(),
    width: this.width(),
    maxWidth: this.maxWidth(),
    checkboxable: this.checkboxable(),
    headerCheckboxable: this.headerCheckboxable(),
    headerClass: this.headerClass(),
    cellClass: this.cellClass(),
    isTreeColumn: this.isTreeColumn(),
    treeLevelIndent: this.treeLevelIndent(),
    summaryFunc: this.summaryFunc(),
    summaryTemplate: this.summaryTemplate(),
    cellTemplate: this.cellTemplateInput() ?? this.cellTemplateQuery(),
    headerTemplate: this.headerTemplateInput() ?? this.headerTemplateQuery(),
    treeToggleTemplate: this.treeToggleTemplateInput() ?? this.treeToggleTemplateQuery(),
    ghostCellTemplate: this.ghostCellTemplateInput() ?? this.ghostCellTemplateQuery()
  }));
}
