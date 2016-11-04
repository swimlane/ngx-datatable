import { DataTableColumnDirective } from '../components/column.directive';
import { camelCase, deCamelCase, id } from '../utils';

export function setColumnDefaults(columns: any[]) {
  if(!columns) return;
  
  for(let column of columns) {
    if(!column.$$id) {
      column.$$id = id();
    }
    
    // translate name => prop
    if(!column.prop && column.name) {
      column.prop = camelCase(column.name);
    }

    // format props if no name passed
    if(column.prop && !column.name) {
      column.name = deCamelCase(column.prop);
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

export function translateTemplates(templates: DataTableColumnDirective[]): any[] {
  let result = [];

  for(const temp of templates) {
    let col: any = {};

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
