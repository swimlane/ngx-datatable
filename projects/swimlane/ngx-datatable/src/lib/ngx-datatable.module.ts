import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollbarHelper } from './services/scrollbar-helper.service';
import { DimensionsHelper } from './services/dimensions-helper.service';
import { ColumnChangesService } from './services/column-changes.service';
import { DataTableFooterTemplateDirective } from './components/footer/footer-template.directive';
import { VisibilityDirective } from './directives/visibility.directive';
import { DraggableDirective } from './directives/draggable.directive';
import { ResizeableDirective } from './directives/resizeable.directive';
import { OrderableDirective } from './directives/orderable.directive';
import { LongPressDirective } from './directives/long-press.directive';
import { ScrollerComponent } from './components/body/scroller.component';
import { DatatableComponent } from './components/datatable.component';
import { DataTableColumnDirective } from './components/columns/column.directive';
import { DataTableHeaderComponent } from './components/header/header.component';
import { DataTableHeaderCellComponent } from './components/header/header-cell.component';
import { DataTableBodyComponent } from './components/body/body.component';
import { DataTableFooterComponent } from './components/footer/footer.component';
import { DataTablePagerComponent } from './components/footer/pager.component';
import { ProgressBarComponent } from './components/body/progress-bar.component';
import { DataTableBodyRowComponent } from './components/body/body-row.component';
import { DataTableRowWrapperComponent } from './components/body/body-row-wrapper.component';
import { DatatableRowDetailDirective } from './components/row-detail/row-detail.directive';
import { DatatableGroupHeaderDirective } from './components/body/body-group-header.directive';
import { DatatableRowDetailTemplateDirective } from './components/row-detail/row-detail-template.directive';
import { DataTableBodyCellComponent } from './components/body/body-cell.component';
import { DataTableSelectionComponent } from './components/body/selection.component';
import { DataTableColumnHeaderDirective } from './components/columns/column-header.directive';
import { DataTableColumnCellDirective } from './components/columns/column-cell.directive';
import { DataTableColumnCellTreeToggle } from './components/columns/tree.directive';
import { DatatableFooterDirective } from './components/footer/footer.directive';
import { DatatableGroupHeaderTemplateDirective } from './components/body/body-group-header-template.directive';
import { DataTableSummaryRowComponent } from './components/body/summary/summary-row.component';
import { ColumnMode } from './types/column-mode.type';
import { SelectionType } from './types/selection.type';
import { SortType } from './types/sort.type';

@NgModule({
  imports: [CommonModule],
  providers: [ScrollbarHelper, DimensionsHelper, ColumnChangesService],
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
    DataTableRowWrapperComponent,
    DatatableRowDetailDirective,
    DatatableGroupHeaderDirective,
    DatatableRowDetailTemplateDirective,
    DataTableBodyCellComponent,
    DataTableSelectionComponent,
    DataTableColumnHeaderDirective,
    DataTableColumnCellDirective,
    DataTableColumnCellTreeToggle,
    DatatableFooterDirective,
    DatatableGroupHeaderTemplateDirective,
    DataTableSummaryRowComponent
  ],
  exports: [
    DatatableComponent,
    DatatableRowDetailDirective,
    DatatableGroupHeaderDirective,
    DatatableRowDetailTemplateDirective,
    DataTableColumnDirective,
    DataTableColumnHeaderDirective,
    DataTableColumnCellDirective,
    DataTableColumnCellTreeToggle,
    DataTableFooterTemplateDirective,
    DatatableFooterDirective,
    DataTablePagerComponent,
    DatatableGroupHeaderTemplateDirective
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

  /**
   * Enable vertical scrollbars
   */
  scrollbarV?: boolean;

  /**
   * Enable horz scrollbars
   */
  scrollbarH?: boolean;

  /**
   * The row height; which is necessary
   * to calculate the height for the lazy rendering.
   */
  rowHeight?: number | 'auto' | ((row?: any) => number);

  /**
   * Type of column width distribution formula.
   * Example: flex, force, standard
   */
  columnMode?: ColumnMode | keyof typeof ColumnMode;

  /**
   * The minimum header height in pixels.
   * Pass a falsey for no header
   */
  headerHeight?: number;

  /**
   * The minimum footer height in pixels.
   * Pass falsey for no footer
   */
  footerHeight?: number;

  /**
   * If the table should use external paging
   * otherwise its assumed that all data is preloaded.
   */
  externalPaging?: boolean;

  /**
   * If the table should use external sorting or
   * the built-in basic sorting.
   */
  externalSorting?: boolean;

  /**
   * Show the linear loading bar.
   * Default value: `false`
   */
  loadingIndicator?: boolean;

  /**
   * Type of row selection. Options are:
   *
   *  - `single`
   *  - `multi`
   *  - `checkbox`
   *  - `multiClick`
   *  - `cell`
   *
   * For no selection pass a `falsey`.
   * Default value: `undefined`
   */
  selectionType?: SelectionType;

  /**
   * Enable/Disable ability to re-order columns
   * by dragging them.
   */
  reorderable?: boolean;

  /**
   * Swap columns on re-order columns or
   * move them.
   */
  swapColumns?: boolean;

  /**
   * The type of sorting
   */
  sortType?: SortType;

  /**
   * Array of sorted columns by property and type.
   * Default value: `[]`
   */
  sorts?: any[];

  /**
   * Css class overrides
   */
  cssClasses?: {
    sortAscending?: string,
    sortDescending?: string,
    sortUnset?: string,
    pagerLeftArrow?: string,
    pagerRightArrow?: string,
    pagerPrevious?: string,
    pagerNext?: string
  };

  /**
   * Message overrides for localization
   *
   * emptyMessage     [default] = 'No data to display'
   * totalMessage     [default] = 'total'
   * selectedMessage  [default] = 'selected'
   */
  messages?: {
    // Message to show when array is presented
    // but contains no values
    emptyMessage?: string,

    // Footer total message
    totalMessage?: string,

    // Footer selected message
    selectedMessage?: string
  };

  /**
   * Row specific classes.
   * Similar implementation to ngClass.
   *
   *  [rowClass]="'first second'"
   *  [rowClass]="{ 'first': true, 'second': true, 'third': false }"
   */
  rowClass?: any;

  /**
   * A boolean/function you can use to check whether you want
   * to select a particular row based on a criteria. Example:
   *
   *    (selection) => {
   *      return selection !== 'Ethel Price';
   *    }
   */
  selectCheck?: (selection: any) => boolean;

  /**
   * A function you can use to check whether you want
   * to show the checkbox for a particular row based on a criteria. Example:
   *
   *    (row, column, value) => {
   *      return row.name !== 'Ethel Price';
   *    }
   */
  displayCheck?: (row: any, column?: any, value?: any) => boolean;

  /**
   * A boolean you can use to set the detault behaviour of rows and groups
   * whether they will start expanded or not. If ommited the default is NOT expanded.
   *
   */
  groupExpansionDefault?: boolean;

  /**
   * Property to which you can use for custom tracking of rows.
   * Example: 'name'
   */
  trackByProp?: string;

  /**
   * A flag for row virtualization on / off
   */
  virtualization?: boolean;

  /**
   * Tree from relation
   */
  treeFromRelation?: string;

  /**
   * Tree to relation
   */
  treeToRelation?: string;

  /**
   * A flag for switching summary row on / off
   */
  summaryRow?: boolean;

  /**
   * A height of summary row
   */
  summaryHeight?: number;

  /**
   * A property holds a summary row position: top/bottom
   */
  summaryPosition?: string;
}
