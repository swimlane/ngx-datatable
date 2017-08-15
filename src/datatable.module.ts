import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'rxjs/add/observable/fromEvent';

import {
  DatatableComponent,
  DataTableColumnDirective,
  DataTableHeaderComponent,
  DataTableBodyComponent,
  DataTableFooterComponent,
  DataTableHeaderCellComponent,
  DataTablePagerComponent,
  DataTableBodyRowComponent,
  DataTableBodySectionHeaderComponent,
  DataTableRowWrapperComponent,
  ProgressBarComponent,
  DataTableBodyCellComponent,
  DatatableRowDetailDirective,
  DatatableSectionDirective,
  ScrollerComponent,
  DataTableSelectionComponent,
  DataTableColumnHeaderDirective,
  DataTableColumnCellDirective,
  DatatableRowDetailTemplateDirective,
  DatatableSectionTemplateDirective,
  DataTableFooterTemplateDirective,
  DatatableFooterDirective
} from './components';

import {
  VisibilityDirective,
  LongPressDirective,
  ResizeableDirective,
  OrderableDirective,
  DraggableDirective
} from './directives';

import { ScrollbarHelper } from './services';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ScrollbarHelper
  ],
  declarations: [
    DataTableFooterTemplateDirective,
    VisibilityDirective,
    DraggableDirective,
    ResizeableDirective,
    OrderableDirective,
    LongPressDirective,
    ScrollerComponent,
    DatatableComponent,
    DataTableColumnDirective,
    DataTableHeaderComponent,
    DataTableHeaderCellComponent,
    DataTableBodyComponent,
    DataTableFooterComponent,
    DataTablePagerComponent,
    ProgressBarComponent,
    DataTableBodyRowComponent,
    DataTableBodySectionHeaderComponent,
    DataTableRowWrapperComponent,
    DatatableRowDetailDirective,
    DatatableRowDetailTemplateDirective,
    DatatableSectionDirective,
    DatatableSectionTemplateDirective,
    DataTableBodyCellComponent,
    DataTableSelectionComponent,
    DataTableColumnHeaderDirective,
    DataTableColumnCellDirective,
    DatatableFooterDirective
  ],
  exports: [
    DatatableComponent,
    DatatableRowDetailDirective,
    DatatableRowDetailTemplateDirective,
    DatatableSectionDirective,
    DatatableSectionTemplateDirective,
    DataTableColumnDirective,
    DataTableColumnHeaderDirective,
    DataTableColumnCellDirective,
    DataTableFooterTemplateDirective,
    DatatableFooterDirective,
    DataTablePagerComponent
  ]
})
export class NgxDatatableModule { }
