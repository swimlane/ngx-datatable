import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicAutoComponent } from './basic/basic-auto.component';
import { BasicFixedComponent } from './basic/basic-fixed.component';
import { FullScreenComponent } from './basic/fullscreen.component';
import { InlineEditComponent } from './basic/inline.component';
import { VirtualScrollComponent } from './basic/virtual.component';
import { ResponsiveComponent } from './basic/responsive.component';
import { DynamicHeightComponent } from './basic/dynamic-height.component';
import { PagingScrollingNoVirtualizationComponent } from './paging/paging-scrolling-novirtualization.component';
import { ColumnFlexComponent } from './columns/column-flex.component';
import { ColumnToggleComponent } from './columns/column-toggle.component';
import { ColumnStandardComponent } from './columns/column-standard.component';
import { ColumnForceComponent } from './columns/column-force.component';
import { ColumnReorderComponent } from './columns/column-reorder.component';
import { HorzVertScrollingComponent } from './basic/scrolling.component';
import { MultipleTablesComponent } from './basic/multiple.component';
import { RowDetailsComponent } from './basic/row-detail.component';
import { LiveDataComponent } from './basic/live.component';
import { RowCssComponent } from './basic/css.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { DisabledRowsComponent } from './basic/disabled-rows.component';
import { FullScreenTreeComponent } from './tree/fullscreen.component';
import { RowGroupingComponent } from './basic/row-grouping.component';
import { ClientPagingComponent } from './paging/paging-client.component';
import { ServerPagingComponent } from './paging/paging-server.component';
import { ServerScrollingComponent } from './paging/scrolling-server.component';
import { VirtualPagingComponent } from './paging/paging-virtual.component';
import { ClientSortingComponent } from './sorting/sorting-client.component';
import { DefaultSortingComponent } from './sorting/sorting-default.component';
import { ServerSortingComponent } from './sorting/sorting-server.component';
import { CellSelectionComponent } from './selection/selection-cell.component';
import { SingleSelectionComponent } from './selection/selection-single.component';
import { MultiSelectionComponent } from './selection/selection-multi.component';
import { MultiClickSelectionComponent } from './selection/selection-multi-click.component';
import { InlineTemplatesComponent } from './templates/template-dom.component';
import { ColumnPinningComponent } from './columns/pinning.component';
import { SummaryRowSimpleComponent } from './summary/summary-row-simple.component';
import { SummaryRowCustomTemplateComponent } from './summary/summary-row-custom-template.component';
import { SummaryRowServerPagingComponent } from './summary/summary-row-server-paging.component';
import { SummaryRowInlineHtmlComponent } from './summary/summary-row-inline-html.component';
import { ScrollingDynamicallyComponent } from './basic/scrolling-dynamically.component';
import { FilterComponent } from './basic/filter.component';
import { TabsDemoComponent } from './basic/tabs.component';
import { RxDemoComponent } from './basic/rx.component';
import { ContextMenuDemoComponent } from './basic/contextmenu.component';
import { FooterDemoComponent } from './basic/footer.component';
import { BasicEmptyComponent } from './basic/empty.component';
import { DarkThemeComponent } from './basic/dark-theme.component';
import { BootstrapThemeComponent } from './basic/bootstrap.component';
import { ClientTreeComponent } from './tree/client-tree.component';
import { SortingComparatorComponent } from './sorting/sorting-comparator.component';
import { MultiDisableSelectionComponent } from './selection/selection-disabled.component';
import { CheckboxSelectionComponent } from './selection/selection-chkbox.component';
import { CustomCheckboxSelectionComponent } from './selection/selection-chkbox-template.component';
import { MultiClickCheckboxSelectionComponent } from './selection/selection-multi-click-chkbox.component';
import { TemplateRefTemplatesComponent } from './templates/template-obj.component';

const routes: Routes = [
  { path: '', component: BasicAutoComponent },
  { path: 'basic-fixed', component: BasicFixedComponent },
  { path: 'full-screen', component: FullScreenComponent },
  { path: 'inline-edit', component: InlineEditComponent },
  { path: 'virtual-scroll', component: VirtualScrollComponent },
  { path: 'horz-vert-scrolling', component: HorzVertScrollingComponent },
  { path: 'scrolling-dynamically', component: ScrollingDynamicallyComponent },
  { path: 'multiple-tables', component: MultipleTablesComponent },
  { path: 'row-details', component: RowDetailsComponent },
  { path: 'responsive', component: ResponsiveComponent },
  { path: 'filter', component: FilterComponent },
  { path: 'hidden', component: TabsDemoComponent },
  { path: 'live', component: LiveDataComponent },
  { path: 'rx', component: RxDemoComponent },
  { path: 'contextmenu', component: ContextMenuDemoComponent },
  { path: 'css', component: RowCssComponent },
  { path: 'dynamic', component: DynamicHeightComponent },
  { path: 'footer', component: FooterDemoComponent },
  { path: 'empty', component: BasicEmptyComponent },
  { path: 'drag-drop', component: DragDropComponent },
  { path: 'disabled', component: DisabledRowsComponent },
  { path: 'dark', component: DarkThemeComponent, data: { dark: true } },
  { path: 'bootstrap', component: BootstrapThemeComponent },
  { path: 'fullscreen-tree', component: FullScreenTreeComponent },
  { path: 'client-tree', component: ClientTreeComponent },
  { path: 'row-grouping', component: RowGroupingComponent },
  { path: 'client-paging', component: ClientPagingComponent },
  { path: 'server-paging', component: ServerPagingComponent },
  {
    path: 'paging-scrolling-novirtualization',
    component: PagingScrollingNoVirtualizationComponent
  },
  { path: 'server-scrolling', component: ServerScrollingComponent },
  { path: 'virtual-paging', component: VirtualPagingComponent },
  { path: 'client-sorting', component: ClientSortingComponent },
  { path: 'default-sorting', component: DefaultSortingComponent },
  { path: 'server-sorting', component: ServerSortingComponent },
  { path: 'comparator-sorting', component: SortingComparatorComponent },
  { path: 'cell-selection', component: CellSelectionComponent },
  { path: 'single-selection', component: SingleSelectionComponent },
  { path: 'multi-selection', component: MultiSelectionComponent },
  { path: 'multi-click-selection', component: MultiClickSelectionComponent },
  { path: 'multidisable-selection', component: MultiDisableSelectionComponent },
  { path: 'chkbox-selection', component: CheckboxSelectionComponent },
  { path: 'chkbox-selection-template', component: CustomCheckboxSelectionComponent },
  { path: 'multi-click-chkbox-selection', component: MultiClickCheckboxSelectionComponent },
  { path: 'templateref', component: TemplateRefTemplatesComponent },
  { path: 'inline', component: InlineTemplatesComponent },
  { path: 'flex', component: ColumnFlexComponent },
  { path: 'toggle', component: ColumnToggleComponent },
  { path: 'fixed', component: ColumnStandardComponent },
  { path: 'force', component: ColumnForceComponent },
  { path: 'pinning', component: ColumnPinningComponent },
  { path: 'reorder', component: ColumnReorderComponent },
  { path: 'simple-summary', component: SummaryRowSimpleComponent },
  { path: 'custom-template-summary', component: SummaryRowCustomTemplateComponent },
  { path: 'paging-summary', component: SummaryRowServerPagingComponent },
  { path: 'inline-html-summary', component: SummaryRowInlineHtmlComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
