import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./basic/basic-auto.component').then(c => c.BasicAutoComponent)
  },
  {
    path: 'basic-fixed',
    loadComponent: () => import('./basic/basic-fixed.component').then(c => c.BasicFixedComponent)
  },
  {
    path: 'full-screen',
    loadComponent: () => import('./basic/fullscreen.component').then(c => c.FullScreenComponent)
  },
  {
    path: 'inline-edit',
    loadComponent: () => import('./basic/inline.component').then(c => c.InlineEditComponent)
  },
  {
    path: 'virtual-scroll',
    loadComponent: () => import('./basic/virtual.component').then(c => c.VirtualScrollComponent)
  },
  {
    path: 'horz-vert-scrolling',
    loadComponent: () =>
      import('./basic/scrolling.component').then(c => c.HorzVertScrollingComponent)
  },
  {
    path: 'scrolling-dynamically',
    loadComponent: () =>
      import('./basic/scrolling-dynamically.component').then(c => c.ScrollingDynamicallyComponent)
  },
  {
    path: 'multiple-tables',
    loadComponent: () => import('./basic/multiple.component').then(c => c.MultipleTablesComponent)
  },
  {
    path: 'row-details',
    loadComponent: () => import('./basic/row-detail.component').then(c => c.RowDetailsComponent)
  },
  {
    path: 'responsive',
    loadComponent: () => import('./basic/responsive.component').then(c => c.ResponsiveComponent)
  },
  {
    path: 'filter',
    loadComponent: () => import('./basic/filter.component').then(c => c.FilterComponent)
  },
  {
    path: 'hidden',
    loadComponent: () => import('./basic/tabs.component').then(c => c.TabsDemoComponent)
  },
  {
    path: 'live',
    loadComponent: () => import('./basic/live.component').then(c => c.LiveDataComponent)
  },
  { path: 'rx', loadComponent: () => import('./basic/rx.component').then(c => c.RxDemoComponent) },
  {
    path: 'contextmenu',
    loadComponent: () =>
      import('./basic/contextmenu.component').then(c => c.ContextMenuDemoComponent)
  },
  {
    path: 'css',
    loadComponent: () => import('./basic/css.component').then(c => c.RowCssComponent)
  },
  {
    path: 'dynamic',
    loadComponent: () =>
      import('./basic/dynamic-height.component').then(c => c.DynamicHeightComponent)
  },
  {
    path: 'footer',
    loadComponent: () => import('./basic/footer.component').then(c => c.FooterDemoComponent)
  },
  {
    path: 'empty',
    loadComponent: () => import('./basic/empty.component').then(c => c.BasicEmptyComponent)
  },
  {
    path: 'drag-drop',
    loadComponent: () => import('./drag-drop/drag-drop.component').then(c => c.DragDropComponent)
  },
  {
    path: 'disabled',
    loadComponent: () =>
      import('./basic/disabled-rows.component').then(c => c.DisabledRowsComponent)
  },
  {
    path: 'dark',
    loadComponent: () => import('./basic/dark-theme.component').then(c => c.DarkThemeComponent),
    data: { dark: true }
  },
  {
    path: 'bootstrap',
    loadComponent: () => import('./basic/bootstrap.component').then(c => c.BootstrapThemeComponent)
  },
  {
    path: 'fullscreen-tree',
    loadComponent: () => import('./tree/fullscreen.component').then(c => c.FullScreenTreeComponent)
  },
  {
    path: 'client-tree',
    loadComponent: () => import('./tree/client-tree.component').then(c => c.ClientTreeComponent)
  },
  {
    path: 'row-grouping',
    loadComponent: () => import('./basic/row-grouping.component').then(c => c.RowGroupingComponent)
  },
  {
    path: 'client-paging',
    loadComponent: () =>
      import('./paging/paging-client.component').then(c => c.ClientPagingComponent)
  },
  {
    path: 'server-paging',
    loadComponent: () =>
      import('./paging/paging-server.component').then(c => c.ServerPagingComponent)
  },
  {
    path: 'paging-scrolling-novirtualization',
    loadComponent: () =>
      import('./paging/paging-scrolling-novirtualization.component').then(
        c => c.PagingScrollingNoVirtualizationComponent
      )
  },
  {
    path: 'server-scrolling',
    loadComponent: () =>
      import('./paging/scrolling-server.component').then(c => c.ServerScrollingComponent)
  },
  {
    path: 'virtual-paging',
    loadComponent: () =>
      import('./paging/paging-virtual.component').then(c => c.VirtualPagingComponent)
  },
  {
    path: 'client-sorting',
    loadComponent: () =>
      import('./sorting/sorting-client.component').then(c => c.ClientSortingComponent)
  },
  {
    path: 'default-sorting',
    loadComponent: () =>
      import('./sorting/sorting-default.component').then(c => c.DefaultSortingComponent)
  },
  {
    path: 'server-sorting',
    loadComponent: () =>
      import('./sorting/sorting-server.component').then(c => c.ServerSortingComponent)
  },
  {
    path: 'comparator-sorting',
    loadComponent: () =>
      import('./sorting/sorting-comparator.component').then(c => c.SortingComparatorComponent)
  },
  {
    path: 'cell-selection',
    loadComponent: () =>
      import('./selection/selection-cell.component').then(c => c.CellSelectionComponent)
  },
  {
    path: 'single-selection',
    loadComponent: () =>
      import('./selection/selection-single.component').then(c => c.SingleSelectionComponent)
  },
  {
    path: 'multi-selection',
    loadComponent: () =>
      import('./selection/selection-multi.component').then(c => c.MultiSelectionComponent)
  },
  {
    path: 'multi-click-selection',
    loadComponent: () =>
      import('./selection/selection-multi-click.component').then(
        c => c.MultiClickSelectionComponent
      )
  },
  {
    path: 'multidisable-selection',
    loadComponent: () =>
      import('./selection/selection-disabled.component').then(c => c.MultiDisableSelectionComponent)
  },
  {
    path: 'chkbox-selection',
    loadComponent: () =>
      import('./selection/selection-chkbox.component').then(c => c.CheckboxSelectionComponent)
  },
  {
    path: 'chkbox-selection-template',
    loadComponent: () =>
      import('./selection/selection-chkbox-template.component').then(
        c => c.CustomCheckboxSelectionComponent
      )
  },
  {
    path: 'multi-click-chkbox-selection',
    loadComponent: () =>
      import('./selection/selection-multi-click-chkbox.component').then(
        c => c.MultiClickCheckboxSelectionComponent
      )
  },
  {
    path: 'templateref',
    loadComponent: () =>
      import('./templates/template-obj.component').then(c => c.TemplateRefTemplatesComponent)
  },
  {
    path: 'inline',
    loadComponent: () =>
      import('./templates/template-dom.component').then(c => c.InlineTemplatesComponent)
  },
  {
    path: 'flex',
    loadComponent: () => import('./columns/column-flex.component').then(c => c.ColumnFlexComponent)
  },
  {
    path: 'toggle',
    loadComponent: () =>
      import('./columns/column-toggle.component').then(c => c.ColumnToggleComponent)
  },
  {
    path: 'fixed',
    loadComponent: () =>
      import('./columns/column-standard.component').then(c => c.ColumnStandardComponent)
  },
  {
    path: 'force',
    loadComponent: () =>
      import('./columns/column-force.component').then(c => c.ColumnForceComponent)
  },
  {
    path: 'pinning',
    loadComponent: () => import('./columns/pinning.component').then(c => c.ColumnPinningComponent)
  },
  {
    path: 'reorder',
    loadComponent: () =>
      import('./columns/column-reorder.component').then(c => c.ColumnReorderComponent)
  },
  {
    path: 'simple-summary',
    loadComponent: () =>
      import('./summary/summary-row-simple.component').then(c => c.SummaryRowSimpleComponent)
  },
  {
    path: 'custom-template-summary',
    loadComponent: () =>
      import('./summary/summary-row-custom-template.component').then(
        c => c.SummaryRowCustomTemplateComponent
      )
  },
  {
    path: 'paging-summary',
    loadComponent: () =>
      import('./summary/summary-row-server-paging.component').then(
        c => c.SummaryRowServerPagingComponent
      )
  },
  {
    path: 'inline-html-summary',
    loadComponent: () =>
      import('./summary/summary-row-inline-html.component').then(
        c => c.SummaryRowInlineHtmlComponent
      )
  }
];
