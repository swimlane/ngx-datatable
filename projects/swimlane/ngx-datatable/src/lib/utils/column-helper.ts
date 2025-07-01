import { QueryList } from '@angular/core';

import { DataTableColumnDirective } from '../components/columns/column.directive';
import { TableColumnInternal } from '../types/internal.types';
import { Row } from '../types/public.types';
import { TableColumn } from '../types/table-column.type';
import { camelCase, deCamelCase } from './camel-case';
import { getterForProp } from './column-prop-getters';
import { id } from './id';
import { orderByComparator } from './sort';

export const toInternalColumn = <T extends Row>(
  columns: TableColumn<T>[] | QueryList<DataTableColumnDirective<T>>,
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
      width: column.width ?? defaultColumnWidth,
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
