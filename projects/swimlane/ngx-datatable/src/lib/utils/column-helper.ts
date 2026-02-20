import { signal } from '@angular/core';

import { TableColumnInternal } from '../types/internal.types';
import { Row } from '../types/public.types';
import { TableColumn } from '../types/table-column.type';
import { camelCase, deCamelCase } from './camel-case';
import { getterForProp } from './column-prop-getters';
import { id } from './id';
import { orderByComparator } from './sort';

export const toInternalColumn = <T extends Row>(
  columns: TableColumn<T>[],
  defaultColumnWidth = 150
): TableColumnInternal<T>[] => {
  let hasTreeColumn = false;
  // TS fails to infer the type here.
  return (columns as TableColumn<T>[]).map(column => {
    const prop = column.prop ?? (column.name ? camelCase(column.name) : undefined);
    // Only one column should hold the tree view,
    // Thus if multiple columns are provided with
    // isTreeColumn as true, we take only the first one
    const isTreeColumn = !!column.isTreeColumn && !hasTreeColumn;
    hasTreeColumn = hasTreeColumn || isTreeColumn;
    // TODO: add check if prop or name is provided if sorting is enabled.

    return {
      ...column,
      $$id: id(),
      $$valueGetter: getterForProp(prop),
      prop,
      name: column.name ?? (prop ? deCamelCase(String(prop)) : ''),
      resizeable: column.resizeable ?? true,
      sortable: column.sortable ?? true,
      comparator: column.comparator ?? orderByComparator,
      draggable: column.draggable ?? true,
      canAutoResize: column.canAutoResize ?? true,
      width: signal(column.width ?? defaultColumnWidth),
      isTreeColumn,
      // in case of the directive, those are getters, so call them explicitly.
      headerTemplate: column.headerTemplate,
      cellTemplate: column.cellTemplate,
      summaryTemplate: column.summaryTemplate,
      ghostCellTemplate: column.ghostCellTemplate,
      treeToggleTemplate: column.treeToggleTemplate
    } as TableColumnInternal; // TS cannot cast here
  });
};

export const toPublicColumn = (column: TableColumnInternal): TableColumn => {
  return {
    checkboxable: column.checkboxable,
    frozenLeft: column.frozenLeft,
    frozenRight: column.frozenRight,
    flexGrow: column.flexGrow,
    minWidth: column.minWidth,
    maxWidth: column.maxWidth,
    width: column.width(),
    resizeable: column.resizeable,
    comparator: column.comparator,
    pipe: column.pipe,
    sortable: column.sortable,
    draggable: column.draggable,
    canAutoResize: column.canAutoResize,
    name: column.name,
    prop: column.prop,
    bindAsUnsafeHtml: column.bindAsUnsafeHtml,
    cellTemplate: column.cellTemplate,
    ghostCellTemplate: column.ghostCellTemplate,
    headerTemplate: column.headerTemplate,
    treeToggleTemplate: column.treeToggleTemplate,
    cellClass: column.cellClass,
    headerClass: column.headerClass,
    headerCheckboxable: column.headerCheckboxable,
    isTreeColumn: column.isTreeColumn,
    treeLevelIndent: column.treeLevelIndent,
    summaryFunc: column.summaryFunc,
    summaryTemplate: column.summaryTemplate
  };
};
