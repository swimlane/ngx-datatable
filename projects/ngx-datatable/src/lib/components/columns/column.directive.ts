import { ContentChild, Directive, Input, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { DataTableColumnHeaderDirective } from './column-header.directive';
import { DataTableColumnCellDirective } from './column-cell.directive';
import { DataTableColumnCellTreeToggle } from './tree.directive';
import { ColumnChangesService } from '../../services/column-changes.service';
import { TableColumnProp } from '../../types/table-column.type';
import { DataTableColumnGhostCellDirective } from './column-ghost-cell.directive';

@Directive({ selector: 'ngx-datatable-column' })
export class DataTableColumnDirective implements OnChanges {
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
    _cellTemplateInput: TemplateRef<any>;

  @ContentChild(DataTableColumnCellDirective, { read: TemplateRef, static: true })
    _cellTemplateQuery: TemplateRef<any>;

  get cellTemplate(): TemplateRef<any> {
    return this._cellTemplateInput || this._cellTemplateQuery;
  }

  @Input('headerTemplate')
    _headerTemplateInput: TemplateRef<any>;

  @ContentChild(DataTableColumnHeaderDirective, { read: TemplateRef, static: true })
    _headerTemplateQuery: TemplateRef<any>;

  get headerTemplate(): TemplateRef<any> {
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
    _ghostCellTemplateInput: TemplateRef<any>;

  @ContentChild(DataTableColumnGhostCellDirective, { read: TemplateRef, static: true })
    _ghostCellTemplateQuery: TemplateRef<any>;

  get ghostCellTemplate(): TemplateRef<any> {
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
