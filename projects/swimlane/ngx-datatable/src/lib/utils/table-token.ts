import { InjectionToken } from '@angular/core';
import type { DatatableComponent } from '../components/datatable.component';

/**
 * This token is created to break cycling import error which occurs when we import
 * DatatableComponent in DataTableRowWrapperComponent.
 */
export const DatatableComponentToken = new InjectionToken<DatatableComponent>(
  'DatatableComponentToken'
);
