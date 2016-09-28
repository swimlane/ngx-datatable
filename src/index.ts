import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  DataTable,
  DataTableColumn,
  DataTableHeader,
  DataTableBody,
  DataTableFooter,
  DataTableHeaderCell,
  DataTablePager,
  DataTableBodyRow,
  ProgressBar,
  DataTableBodyCell
} from './components';

import {
  Visibility,
  LongPress,
  Resizeable,
  Orderable,
  Draggable,
  Scroller,
  TemplateWrapper
} from './directives';

export * from './types';
export * from './models';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    Visibility,
    Draggable,
    Resizeable,
    Orderable,
    LongPress,
    TemplateWrapper,
    Scroller,
    DataTable,
    DataTableColumn,
    DataTableHeader,
    DataTableHeaderCell,
    DataTableBody,
    DataTableFooter,
    DataTablePager,
    ProgressBar,
    DataTableBodyRow,
    DataTableBodyCell
  ],
  exports: [
    DataTable,
    DataTableColumn
  ]
})
export class Angular2DataTableModule { }
