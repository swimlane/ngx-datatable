import { PipeTransform } from '@angular/core';

/**
 * Column Type
 * @type {object}
 */
export interface TableColumn {

  // unique id
  $$id?: string;

  // used internally for resize calcs
  $$oldWidth?: number;

  // defines if its expressive
  isExpressive?: boolean;

  // pinned to the left
  frozenLeft?: boolean;

  // pinned to the right
  frozenRight?: boolean;

  // The grow factor relative to other columns. Same as the flex-grow
  // API from http =//www.w3.org/TR/css3-flexbox/. Basically;
  // take any available extra width and distribute it proportionally
  // according to all columns' flexGrow values.
  flexGrow?: number;

  // Minimum width of the column.
  minWidth?: number;

  // Maximum width of the column.
  maxWidth?: number;

  // The width of the column; by default (in pixels).
  width?: number;

  // If yes then the column can be resized; otherwise it cannot.
  resizeable?: boolean;

  // Custom sort comparator
  comparator?: any;

  // Custom pipe
  pipe?: PipeTransform;

  // If yes then the column can be sorted.
  sortable?: boolean;

  // can column be dragged
  draggable?: boolean;

  // Whether the column can automatically resize to fill space in the table.
  canAutoResize?: boolean;

  // column name / label
  name?: string;

  // property to bind to on the row
  prop?: string;

  // ng2 template ref
  cellTemplate?: any;

  // ng2 template ref
  headerTemplate?: any;

}
