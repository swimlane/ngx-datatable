import { ModuleWithProviders, NgModule } from '@angular/core';
import { DataTableFooterTemplateDirective } from './components/footer/footer-template.directive';
import { DatatableComponent } from './components/datatable.component';
import { DataTableColumnDirective } from './components/columns/column.directive';
import { DatatableRowDetailDirective } from './components/row-detail/row-detail.directive';
import { DatatableGroupHeaderDirective } from './components/body/body-group-header.directive';
import { DatatableRowDetailTemplateDirective } from './components/row-detail/row-detail-template.directive';
import { DataTableColumnHeaderDirective } from './components/columns/column-header.directive';
import { DataTableColumnCellDirective } from './components/columns/column-cell.directive';
import { DataTableColumnGhostCellDirective } from './components/columns/column-ghost-cell.directive';
import { DataTableColumnCellTreeToggle } from './components/columns/tree.directive';
import { DatatableFooterDirective } from './components/footer/footer.directive';
import { DatatableGroupHeaderTemplateDirective } from './components/body/body-group-header-template.directive';
import { DisableRowDirective } from './directives/disable-row.directive';
import {
  DatatableRowDefComponent,
  DatatableRowDefDirective
} from './components/body/body-row-def.component';

@NgModule({
  imports: [
    DataTableFooterTemplateDirective,
    DatatableComponent,
    DataTableColumnDirective,
    DatatableRowDetailDirective,
    DatatableGroupHeaderDirective,
    DatatableRowDetailTemplateDirective,
    DataTableColumnHeaderDirective,
    DataTableColumnCellDirective,
    DataTableColumnGhostCellDirective,
    DataTableColumnCellTreeToggle,
    DatatableFooterDirective,
    DatatableGroupHeaderTemplateDirective,
    DisableRowDirective,
    DatatableRowDefComponent,
    DatatableRowDefDirective
  ],
  exports: [
    DatatableComponent,
    DatatableRowDetailDirective,
    DatatableGroupHeaderDirective,
    DatatableRowDetailTemplateDirective,
    DataTableColumnDirective,
    DataTableColumnHeaderDirective,
    DataTableColumnCellDirective,
    DataTableColumnGhostCellDirective,
    DataTableColumnCellTreeToggle,
    DataTableFooterTemplateDirective,
    DatatableFooterDirective,
    DatatableGroupHeaderTemplateDirective,
    DisableRowDirective,
    DatatableRowDefComponent,
    DatatableRowDefDirective
  ]
})
export class NgxDatatableModule {
  /**
   * Configure global configuration via INgxDatatableConfig
   * @param configuration
   */
  static forRoot(configuration: INgxDatatableConfig): ModuleWithProviders<NgxDatatableModule> {
    return {
      ngModule: NgxDatatableModule,
      providers: [{ provide: 'configuration', useValue: configuration }]
    };
  }
}

/**
 * Interface definition for INgxDatatableConfig global configuration
 */
export interface INgxDatatableConfig {
  messages?: {
    /** Message to show when the array is present but empty */
    emptyMessage: string;
    /** Footer total message */
    totalMessage: string;
    /** Footer selected message */
    selectedMessage: string;
    /** Pager screen reader message for the first page button */
    ariaFirstPageMessage: string;
    /**
     * Pager screen reader message for the n-th page button.
     * It will be rendered as: `{{ariaPageNMessage}} {{n}}`.
     */
    ariaPageNMessage: string;
    /** Pager screen reader message for the previous page button */
    ariaPreviousPageMessage: string;
    /** Pager screen reader message for the next page button */
    ariaNextPageMessage: string;
    /** Pager screen reader message for the last page button */
    ariaLastPageMessage: string;
  };
  cssClasses?: {
    sortAscending: string;
    sortDescending: string;
    sortUnset: string;
    pagerLeftArrow: string;
    pagerRightArrow: string;
    pagerPrevious: string;
    pagerNext: string;
  };
  headerHeight?: number;
  footerHeight?: number;
  rowHeight?: number;
  defaultColumnWidth?: number;
}
