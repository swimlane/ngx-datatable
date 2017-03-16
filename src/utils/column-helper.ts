import { TableColumn } from '../types';
import { DataTableColumnDirective } from '../components/columns';
import { camelCase, deCamelCase } from './camel-case';
import { id } from './id';
import { getterForProp } from './column-prop-getters';

/**
 * Sets the column defaults
 * 
 * @export
 * @param {any[]} columns
 * @returns
 */
export function setColumnDefaults(columns: TableColumn[]) {
  if(!columns) return;

  for(const column of columns) {
    if(!column.$$id) {
      column.$$id = id();
    }

    // prop can be numeric; zero is valid not a missing prop
    // translate name => prop
    if(column.prop == null && column.name) {
      column.prop = camelCase(column.name);
    }

    if (!column.$$valueGetter) {
      column.$$valueGetter = getterForProp(column.prop);
    }

    // format props if no name passed
    if(column.prop != null && !column.name) {
      column.name = deCamelCase(String(column.prop));
    }

    if(!column.hasOwnProperty('resizeable')) {
      column.resizeable = true;
    }

    if(!column.hasOwnProperty('sortable')) {
      column.sortable = true;
    }

    if(!column.hasOwnProperty('draggable')) {
      column.draggable = true;
    }

    if(!column.hasOwnProperty('canAutoResize')) {
      column.canAutoResize = true;
    }

    if(!column.hasOwnProperty('width')) {
      column.width = 150;
    }
  }
}

/**
 * Translates templates definitions to objects
 * 
 * @export
 * @param {DataTableColumnDirective[]} templates
 * @returns {any[]}
 */
export function translateTemplates(templates: DataTableColumnDirective[]): any[] {
  const result: any[] = [];

  for(const temp of templates) {
    const col: any = {};

    const props = Object.getOwnPropertyNames(temp);
    for(const prop of props) {
      col[prop] = temp[prop];
    }

    if(temp.headerTemplate) {
      col.headerTemplate = temp.headerTemplate;
    }

    if(temp.cellTemplate) {
      col.cellTemplate = temp.cellTemplate;
    }

    result.push(col);
  }

  return result;
}
