import { Directive, TemplateRef, ContentChild, Input } from '@angular/core';
import { DataTableColumnHeaderDirective } from './column-header.directive';
import { DataTableColumnCellDirective } from './column-cell.directive';
import {
  DataTableColumnCellTreeExpander,
  DataTableColumnCellTreeCollapser,
  DataTableColumnCellTreeLoader,
  DataTableColumnCellTreeDisable
} from './tree.directive';
import { TableColumnProp } from '../../types';

@Directive({ selector: 'ngx-datatable-column' })
export class DataTableColumnDirective {

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
  @Input() headerClass: string | ((data: any) => string|any);
  @Input() cellClass: string | ((data: any) => string|any);
  @Input() isTreeColumn: boolean;

  @Input()
  @ContentChild(DataTableColumnCellDirective, { read: TemplateRef })
  cellTemplate: TemplateRef<any>;

  @Input()
  @ContentChild(DataTableColumnHeaderDirective, { read: TemplateRef })
  headerTemplate: TemplateRef<any>;

  @Input()
  @ContentChild(DataTableColumnCellTreeExpander, { read: TemplateRef })
  treeExpanderTemplate: TemplateRef<any>;

  @Input()
  @ContentChild(DataTableColumnCellTreeCollapser, { read: TemplateRef })
  treeCollapserTemplate: TemplateRef<any>;

  @Input()
  @ContentChild(DataTableColumnCellTreeLoader, { read: TemplateRef })
  treeLoaderTemplate: TemplateRef<any>;

  @Input()
  @ContentChild(DataTableColumnCellTreeDisable, { read: TemplateRef })
  treeDisableTemplate: TemplateRef<any>;
}
