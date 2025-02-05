import { camelCase, deCamelCase } from './camel-case';
import { id } from './id';
import { getterForProp } from './column-prop-getters';
import { TableColumn } from '../types/table-column.type';
import { DataTableColumnDirective } from '../components/columns/column.directive';

/**
 * Sets the column defaults
 */
export function setColumnDefaults(columns: TableColumn[], defaultColumnWidth = 150) {
  if (!columns) {
    return;
  }

  // Only one column should hold the tree view
  // Thus if multiple columns are provided with
  // isTreeColumn as true we take only the first one
  let treeColumnFound: boolean = false;

  for (const column of columns) {
    if (!column.$$id) {
      column.$$id = id();
    }

    // prop can be numeric; zero is valid not a missing prop
    // translate name => prop
    if (isNullOrUndefined(column.prop) && column.name) {
      column.prop = camelCase(column.name);
    }

    if (!column.$$valueGetter) {
      column.$$valueGetter = getterForProp(column.prop);
    }

    // format props if no name passed
    if (!isNullOrUndefined(column.prop) && isNullOrUndefined(column.name)) {
      column.name = deCamelCase(String(column.prop));
    }

    if (isNullOrUndefined(column.prop) && isNullOrUndefined(column.name)) {
      column.name = ''; // Fixes IE and Edge displaying `null`
    }

    if (!('resizeable' in column)) {
      column.resizeable = true;
    }

    if (!('sortable' in column)) {
      column.sortable = true;
    }

    if (!('draggable' in column)) {
      column.draggable = true;
    }

    if (!('canAutoResize' in column)) {
      column.canAutoResize = true;
    }

    if (!('width' in column)) {
      column.width = defaultColumnWidth;
    }

    if (!('isTreeColumn' in column)) {
      column.isTreeColumn = false;
    } else {
      if (column.isTreeColumn && !treeColumnFound) {
        // If the first column with isTreeColumn is true found
        // we mark that treeCoulmn is found
        treeColumnFound = true;
      } else {
        // After that isTreeColumn property for any other column
        // will be set as false
        column.isTreeColumn = false;
      }
    }
  }
}

export function isNullOrUndefined<T>(value: T | null | undefined): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * Translates templates definitions to objects
 */
export function translateTemplates<TRow>(
  templates: DataTableColumnDirective<TRow>[]
): TableColumn[] {
  const result: TableColumn[] = [];
  for (const temp of templates) {
    const col: TableColumn = {};

    const props = Object.getOwnPropertyNames(temp);
    for (const prop of props) {
      col[prop] = temp[prop];
    }

    if (temp.headerTemplate) {
      col.headerTemplate = temp.headerTemplate;
    }

    if (temp.cellTemplate) {
      col.cellTemplate = temp.cellTemplate;
    }

    if (temp.ghostCellTemplate) {
      col.ghostCellTemplate = temp.ghostCellTemplate;
    }

    if (temp.summaryFunc) {
      col.summaryFunc = temp.summaryFunc;
    }

    if (temp.summaryTemplate) {
      col.summaryTemplate = temp.summaryTemplate;
    }

    result.push(col);
  }

  return result;
}
