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
import { AllPartial, NgxDatatableConfig, providedNgxDatatableConfig } from './ngx-datatable.config';

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
  static forRoot(
    configuration: AllPartial<NgxDatatableConfig>
  ): ModuleWithProviders<NgxDatatableModule> {
    return {
      ngModule: NgxDatatableModule,
      providers: [providedNgxDatatableConfig(configuration)]
    };
  }
}
