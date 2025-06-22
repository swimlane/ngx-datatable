import { InjectionToken, Provider } from '@angular/core';

/** Interface for messages to override default table texts. */
export interface NgxDatatableMessages {
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
}

/** CSS classes for icons that override the default table icons. */
export interface NgxDatatableCssClasses {
  sortAscending: string;
  sortDescending: string;
  sortUnset: string;
  pagerLeftArrow: string;
  pagerRightArrow: string;
  pagerPrevious: string;
  pagerNext: string;
}

/**
 * Interface definition for ngx-datatable global configuration
 */
// TODO those properties should all be required in the interface. Should be changed with signal migration.
export interface NgxDatatableConfig {
  messages?: NgxDatatableMessages;
  cssClasses?: NgxDatatableCssClasses;
  headerHeight?: number;
  footerHeight?: number;
  rowHeight?: number;
  defaultColumnWidth?: number;
}

export const NGX_DATATABLE_CONFIG = new InjectionToken<NgxDatatableConfig>('ngx-datatable.config');

/**
 * This makes all properties recursively optional.
 *
 * @internal
 */
export type AllPartial<T> = { [K in keyof T]?: AllPartial<T[K]> };

/**
 * Interface definition for INgxDatatableConfig global configuration.
 *
 * @deprecated Use {@link NgxDatatableConfig} instead.
 */
export type INgxDatatableConfig = NgxDatatableConfig;

/**
 * Provides a global configuration for ngx-datatable.
 *
 * @param overrides The overrides of the table configuration.
 */
export function providedNgxDatatableConfig(overrides: AllPartial<NgxDatatableConfig>): Provider {
  return {
    provide: NGX_DATATABLE_CONFIG,
    useValue: overrides
  };
}
