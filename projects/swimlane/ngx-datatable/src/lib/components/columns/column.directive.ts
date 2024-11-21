import {
  booleanAttribute,
  ContentChild,
  Directive,
  inject,
  Input,
  numberAttribute,
  OnChanges,
  PipeTransform,
  TemplateRef
} from '@angular/core';
import { DataTableColumnHeaderDirective } from './column-header.directive';
import { DataTableColumnCellDirective } from './column-cell.directive';
import { DataTableColumnCellTreeToggle } from './tree.directive';
import { ColumnChangesService } from '../../services/column-changes.service';
import { TableColumn, TableColumnProp } from '../../types/table-column.type';
import { DataTableColumnGhostCellDirective } from './column-ghost-cell.directive';
import { CellContext, HeaderCellContext } from '../../types/public.types';

@Directive({
  selector: 'ngx-datatable-column',
  standalone: true
})
export class DataTableColumnDirective<TRow> implements TableColumn, OnChanges {
  private columnChangesService = inject(ColumnChangesService);
  @Input() name: string;
  @Input() prop: TableColumnProp;
  @Input({ transform: booleanAttribute }) bindAsUnsafeHtml?: boolean;
  @Input({ transform: booleanAttribute }) frozenLeft: boolean;
  @Input({ transform: booleanAttribute }) frozenRight: boolean;
  @Input({ transform: numberAttribute }) flexGrow: number;
  @Input({ transform: booleanAttribute }) resizeable: boolean;
  @Input() comparator: any;
  @Input() pipe: PipeTransform;
  @Input({ transform: booleanAttribute }) sortable: boolean;
  @Input({ transform: booleanAttribute }) draggable: boolean;
  @Input({ transform: booleanAttribute }) canAutoResize: boolean;
  @Input({ transform: numberAttribute }) minWidth: number;
  @Input({ transform: numberAttribute }) width: number;
  @Input({ transform: numberAttribute }) maxWidth: number;
  @Input({ transform: booleanAttribute }) checkboxable: boolean;
  @Input({ transform: booleanAttribute }) headerCheckboxable: boolean;
  @Input() headerClass:
    | string
    | ((data: { column: TableColumn }) => string | Record<string, boolean>);
  @Input() cellClass?:
    | string
    | ((data: {
        row: TRow;
        group?: TRow[];
        column: TableColumn<TRow>;
        value: any;
        rowHeight: number;
      }) => string | Record<string, boolean>);
  @Input({ transform: booleanAttribute }) isTreeColumn: boolean;
  @Input() treeLevelIndent: number;
  @Input() summaryFunc: (cells: any[]) => any;
  @Input() summaryTemplate: TemplateRef<any>;

  @Input('cellTemplate')
  _cellTemplateInput: TemplateRef<CellContext<TRow>>;

  @ContentChild(DataTableColumnCellDirective, { read: TemplateRef, static: true })
  _cellTemplateQuery: TemplateRef<CellContext<TRow>>;

  get cellTemplate(): TemplateRef<CellContext<TRow>> {
    return this._cellTemplateInput || this._cellTemplateQuery;
  }

  @Input('headerTemplate')
  _headerTemplateInput: TemplateRef<HeaderCellContext>;

  @ContentChild(DataTableColumnHeaderDirective, { read: TemplateRef, static: true })
  _headerTemplateQuery: TemplateRef<HeaderCellContext>;

  get headerTemplate(): TemplateRef<HeaderCellContext> {
    return this._headerTemplateInput || this._headerTemplateQuery;
  }

  @Input('treeToggleTemplate')
  _treeToggleTemplateInput: TemplateRef<any>;

  @ContentChild(DataTableColumnCellTreeToggle, { read: TemplateRef, static: true })
  _treeToggleTemplateQuery: TemplateRef<any>;

  get treeToggleTemplate(): TemplateRef<any> {
    return this._treeToggleTemplateInput || this._treeToggleTemplateQuery;
  }

  @Input('ghostCellTemplate')
  _ghostCellTemplateInput: TemplateRef<void>;

  @ContentChild(DataTableColumnGhostCellDirective, { read: TemplateRef, static: true })
  _ghostCellTemplateQuery: TemplateRef<void>;

  get ghostCellTemplate(): TemplateRef<void> {
    return this._ghostCellTemplateInput || this._ghostCellTemplateQuery;
  }

  private isFirstChange = true;

  ngOnChanges() {
    if (this.isFirstChange) {
      this.isFirstChange = false;
    } else {
      this.columnChangesService.onInputChange();
    }
  }
}
