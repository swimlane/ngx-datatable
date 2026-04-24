import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./basic/fluid-row-height.component').then(c => c.FluidRowHeightComponent)
  },
  // Basic
  {
    path: '10k-rows',
    loadComponent: () => import('./basic/10k-rows.component').then(c => c.TenKRowsComponent)
  },
  {
    path: 'full-screen',
    loadComponent: () => import('./basic/full-screen.component').then(c => c.FullScreenComponent)
  },
  {
    path: 'inline-editing',
    loadComponent: () =>
      import('./basic/inline-editing.component').then(c => c.InlineEditingComponent)
  },
  {
    path: 'horz-vert-scrolling',
    loadComponent: () =>
      import('./basic/horz-vert-scrolling.component').then(c => c.HorzVertScrollingComponent)
  },
  {
    path: 'vert-dynamic-scrolling',
    loadComponent: () =>
      import('./basic/vert-dynamic-scrolling.component').then(c => c.VertDynamicScrollingComponent)
  },
  {
    path: 'multiple-tables',
    loadComponent: () =>
      import('./basic/multiple-tables.component').then(c => c.MultipleTablesComponent)
  },
  {
    path: 'filtering',
    loadComponent: () => import('./basic/filtering.component').then(c => c.FilteringComponent)
  },
  {
    path: 'hidden-on-load',
    loadComponent: () =>
      import('./basic/hidden-on-load.component').then(c => c.HiddenOnLoadComponent)
  },
  {
    path: 'live-data',
    loadComponent: () => import('./basic/live-data.component').then(c => c.LiveDataComponent)
  },
  {
    path: 'rxjs',
    loadComponent: () => import('./basic/rxjs.component').then(c => c.RxjsComponent)
  },
  {
    path: 'context-menu',
    loadComponent: () => import('./basic/context-menu.component').then(c => c.ContextMenuComponent)
  },
  {
    path: 'css-classes',
    loadComponent: () => import('./basic/css-classes.component').then(c => c.CssClassesComponent)
  },
  {
    path: 'footer-template',
    loadComponent: () =>
      import('./basic/footer-template.component').then(c => c.FooterTemplateComponent)
  },
  {
    path: 'empty-template',
    loadComponent: () =>
      import('./basic/empty-template.component').then(c => c.EmptyTemplateComponent)
  },
  {
    path: 'drag-drop',
    loadComponent: () => import('./drag-drop/drag-drop.component').then(c => c.DragDropComponent)
  },
  // Themes
  {
    path: 'dark-theme',
    loadComponent: () => import('./basic/dark-theme.component').then(c => c.DarkThemeComponent),
    data: { dark: true }
  },
  {
    path: 'bootstrap-theme',
    loadComponent: () =>
      import('./basic/bootstrap-theme.component').then(c => c.BootstrapThemeComponent)
  },
  // Tree
  {
    path: 'full-screen-tree',
    loadComponent: () =>
      import('./tree/full-screen-tree.component').then(c => c.FullScreenTreeComponent)
  },
  {
    path: 'client-side-tree',
    loadComponent: () =>
      import('./tree/client-side-tree.component').then(c => c.ClientSideTreeComponent)
  },
  // Rows
  {
    path: 'row-grouping',
    loadComponent: () => import('./basic/row-grouping.component').then(c => c.RowGroupingComponent)
  },
  {
    path: 'fixed-row-height',
    loadComponent: () =>
      import('./basic/fixed-row-height.component').then(c => c.FixedRowHeightComponent)
  },
  {
    path: 'dynamic-row-height',
    loadComponent: () =>
      import('./basic/dynamic-row-height.component').then(c => c.DynamicRowHeightComponent)
  },
  {
    path: 'row-detail',
    loadComponent: () => import('./basic/row-detail.component').then(c => c.RowDetailComponent)
  },
  {
    path: 'responsive',
    loadComponent: () => import('./basic/responsive.component').then(c => c.ResponsiveComponent)
  },
  {
    path: 'disabled',
    loadComponent: () => import('./basic/disabled.component').then(c => c.DisabledComponent)
  },
  // Paging
  {
    path: 'client-side-paging',
    loadComponent: () =>
      import('./paging/client-side-paging.component').then(c => c.ClientSidePagingComponent)
  },
  {
    path: 'server-side-paging',
    loadComponent: () =>
      import('./paging/server-side-paging.component').then(c => c.ServerSidePagingComponent)
  },
  {
    path: 'scrolling-no-virtual',
    loadComponent: () =>
      import('./paging/scrolling-no-virtual.component').then(c => c.ScrollingNoVirtualComponent)
  },
  {
    path: 'scrolling-server-side',
    loadComponent: () =>
      import('./paging/scrolling-server-side.component').then(c => c.ScrollingServerSideComponent)
  },
  {
    path: 'virtual-server-side',
    loadComponent: () =>
      import('./paging/virtual-server-side.component').then(c => c.VirtualServerSideComponent)
  },
  // Sorting
  {
    path: 'client-side-sorting',
    loadComponent: () =>
      import('./sorting/client-side-sorting.component').then(c => c.ClientSideSortingComponent)
  },
  {
    path: 'default-sort',
    loadComponent: () =>
      import('./sorting/default-sort.component').then(c => c.DefaultSortComponent)
  },
  {
    path: 'server-side-sorting',
    loadComponent: () =>
      import('./sorting/server-side-sorting.component').then(c => c.ServerSideSortingComponent)
  },
  {
    path: 'comparator',
    loadComponent: () => import('./sorting/comparator.component').then(c => c.ComparatorComponent)
  },
  // Selection
  {
    path: 'cell-selection',
    loadComponent: () =>
      import('./selection/cell-selection.component').then(c => c.CellSelectionComponent)
  },
  {
    path: 'single-row-selection',
    loadComponent: () =>
      import('./selection/single-row-selection.component').then(c => c.SingleRowSelectionComponent)
  },
  {
    path: 'multi-row-selection',
    loadComponent: () =>
      import('./selection/multi-row-selection.component').then(c => c.MultiRowSelectionComponent)
  },
  {
    path: 'multi-click-row-selection',
    loadComponent: () =>
      import('./selection/multi-click-row-selection.component').then(
        c => c.MultiClickRowSelectionComponent
      )
  },
  {
    path: 'disable-selection-callback',
    loadComponent: () =>
      import('./selection/disable-selection-callback.component').then(
        c => c.DisableSelectionCallbackComponent
      )
  },
  {
    path: 'checkbox-selection',
    loadComponent: () =>
      import('./selection/checkbox-selection.component').then(c => c.CheckboxSelectionComponent)
  },
  {
    path: 'custom-checkbox-selection',
    loadComponent: () =>
      import('./selection/custom-checkbox-selection.component').then(
        c => c.CustomCheckboxSelectionComponent
      )
  },
  {
    path: 'multi-click-and-checkbox-selection',
    loadComponent: () =>
      import('./selection/multi-click-and-checkbox-selection.component').then(
        c => c.MultiClickAndCheckboxSelectionComponent
      )
  },
  // Templates
  {
    path: 'inline-template',
    loadComponent: () =>
      import('./templates/inline-template.component').then(c => c.InlineTemplateComponent)
  },
  {
    path: 'template-ref',
    loadComponent: () =>
      import('./templates/template-ref.component').then(c => c.TemplateRefComponent)
  },
  // Column
  {
    path: 'flex-column',
    loadComponent: () => import('./columns/flex-column.component').then(c => c.FlexColumnComponent)
  },
  {
    path: 'column-toggling',
    loadComponent: () =>
      import('./columns/column-toggling.component').then(c => c.ColumnTogglingComponent)
  },
  {
    path: 'fixed-column',
    loadComponent: () =>
      import('./columns/fixed-column.component').then(c => c.FixedColumnComponent)
  },
  {
    path: 'force-column',
    loadComponent: () =>
      import('./columns/force-column.component').then(c => c.ForceColumnComponent)
  },
  {
    path: 'column-pinning',
    loadComponent: () =>
      import('./columns/column-pinning.component').then(c => c.ColumnPinningComponent)
  },
  {
    path: 'column-reorder',
    loadComponent: () =>
      import('./columns/column-reorder.component').then(c => c.ColumnReorderComponent)
  },
  // Summary Row
  {
    path: 'simple-summary',
    loadComponent: () =>
      import('./summary/simple-summary.component').then(c => c.SimpleSummaryComponent)
  },
  {
    path: 'custom-template-summary',
    loadComponent: () =>
      import('./summary/custom-template-summary.component').then(
        c => c.CustomTemplateSummaryComponent
      )
  },
  {
    path: 'server-side-paging-summary',
    loadComponent: () =>
      import('./summary/server-side-paging-summary.component').then(
        c => c.ServerSidePagingSummaryComponent
      )
  },
  {
    path: 'inline-html-summary',
    loadComponent: () =>
      import('./summary/inline-html-summary.component').then(c => c.InlineHtmlSummaryComponent)
  }
];
