import {
  ContentChild,
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { DataTableColumnHeaderDirective } from './column-header.directive';
import { DataTableColumnCellDirective } from './column-cell.directive';
import { DataTableColumnCellTreeToggle } from './tree.directive';
import { ColumnChangesService } from '../../services/column-changes.service';
import { TableColumnProp } from '../../types/table-column.type';
import { DataTableColumnGhostCellDirective } from './column-ghost-cell.directive';
import { CellContext, HeaderCellContext } from '../../types/public.types';

@Directive({ selector: 'ngx-datatable-column' })
export class DataTableColumnDirective<TRow> implements OnChanges {
  @Input() name: string;
  @Input() prop: TableColumnProp;
  @Input() frozenLeft: any;
  @Input() frozenRight: any;
  @Input() flexGrow: number;
  @Input() resizeable: boolean;
  @Input() comparator: any;
  @Input() pipe: any;
  @Input() sortable: boolean;
  @Input() draggable: boolean;
  @Input() canAutoResize: boolean;
  @Input() minWidth: number;
  @Input() width: number;
  @Input() maxWidth: number;
  @Input() checkboxable: boolean;
  @Input() headerCheckboxable: boolean;
  @Input() headerClass: string | ((data: any) => string | any);
  @Input() cellClass: string | ((data: any) => string | any);
  @Input() isTreeColumn: boolean;
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

  constructor(private columnChangesService: ColumnChangesService) {}

  ngOnChanges() {
    if (this.isFirstChange) {
      this.isFirstChange = false;
    } else {
      this.columnChangesService.onInputChange();
    }
  }
}
