/*
 * Public API Surface of ngx-datatable
 */

// components
export * from './lib/ngx-datatable.module';
export * from './lib/components/datatable.component';
export * from './lib/components/body/body-group-header.directive';
export * from './lib/components/body/body-group-header-template.directive';
export * from './lib/components/footer/footer.directive';
export * from './lib/components/footer/footer-template.directive';
export * from './lib/components/columns/column.directive';
export * from './lib/components/columns/column-header.directive';
export * from './lib/components/columns/column-cell.directive';
export * from './lib/components/columns/column-ghost-cell.directive';
export * from './lib/components/columns/tree.directive';
export * from './lib/components/row-detail/row-detail.directive';
export * from './lib/components/row-detail/row-detail-template.directive';
export * from './lib/components/body/body-row-def.component';

// directives
export * from './lib/directives/disable-row.directive';

// types
export * from './lib/types/public.types';
export * from './lib/types/table-column.type';

export {
  providedNgxDatatableConfig,
  NgxDatatableConfig,
  NgxDatatableMessages,
  NgxDatatableCssClasses
} from './lib/ngx-datatable.config';
