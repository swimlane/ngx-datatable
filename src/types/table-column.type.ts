import { PipeTransform } from '@angular/core';
import { ValueGetter } from '../utils/column-prop-getters';

/**
 * Column property that indicates how to retrieve this column's
 * value from a row.
 * 'a.deep.value', 'normalprop', 0 (numeric)
 */
export type TableColumnProp = string|number;

/**
 * Column Type
 * @type {object}
 */
export interface TableColumn {

  /**
   * Internal unique id
   * 
   * @type {string}
   * @memberOf TableColumn
   */
  $$id?: string;

  /**
   * Internal for column width distributions
   * 
   * @type {number}
   * @memberOf TableColumn
   */
  $$oldWidth?: number;

  /**
   * Internal for setColumnDefaults
   * 
   * @type {ValueGetter}
   * @memberOf TableColumn
   */
  $$valueGetter?: ValueGetter;

  /**
   * Determines if column is checkbox
   * 
   * @type {boolean}
   * @memberOf TableColumn
   */
  checkboxable?: boolean;

  /**
   * Determines if the column is frozen to the left
   * 
   * @type {boolean}
   * @memberOf TableColumn
   */
  frozenLeft?: boolean;

  /**
   * Determines if the column is frozen to the right
   * 
   * @type {boolean}
   * @memberOf TableColumn
   */
  frozenRight?: boolean;

  /**
   * The grow factor relative to other columns. Same as the flex-grow
   * API from http =//www.w3.org/TR/css3-flexbox/. Basically; 
   * take any available extra width and distribute it proportionally
   * according to all columns' flexGrow values.
   * 
   * @type {number}
   * @memberOf TableColumn
   */
  flexGrow?: number;

  /**
   * Min width of the column
   * 
   * @type {number}
   * @memberOf TableColumn
   */
  minWidth?: number;

  /**
   * Max width of the column
   * 
   * @type {number}
   * @memberOf TableColumn
   */
  maxWidth?: number;

  /**
   * The default width of the column, in pixels
   * 
   * @type {number}
   * @memberOf TableColumn
   */
  width?: number;

  /**
   * Can the column be resized
   * 
   * @type {boolean}
   * @memberOf TableColumn
   */
  resizeable?: boolean;

  /**
   * Custom sort comparator
   * 
   * @type {*}
   * @memberOf TableColumn
   */
  comparator?: any;

  /**
   * Custom pipe transforms
   * 
   * @type {PipeTransform}
   * @memberOf TableColumn
   */
  pipe?: PipeTransform;

  /**
   * Can the column be sorted
   * 
   * @type {boolean}
   * @memberOf TableColumn
   */
  sortable?: boolean;

  /**
   * Can the column be re-arranged by dragging
   * 
   * @type {boolean}
   * @memberOf TableColumn
   */
  draggable?: boolean;

  /**
   * Whether the column can automatically resize to fill space in the table.
   * 
   * @type {boolean}
   * @memberOf TableColumn
   */
  canAutoResize?: boolean;

  /**
   * Column name or label
   * 
   * @type {string}
   * @memberOf TableColumn
   */
  name?: string;

  /**
   * Property to bind to the row. Example:
   * 
   * `someField` or `some.field.nested`, 0 (numeric)
   * 
   * If left blank, will use the name as camel case conversion
   * 
   * @type {TableColumnProp}
   * @memberOf TableColumn
   */
  prop?: TableColumnProp;

  /**
   * Cell template ref
   * 
   * @type {*}
   * @memberOf TableColumn
   */
  cellTemplate?: any;

  /**
   * Header template ref
   * 
   * @type {*}
   * @memberOf TableColumn
   */
  headerTemplate?: any;

  /**
   * CSS Classes for the cell
   * 
   * 
   * @memberOf TableColumn
   */
  cellClass?: string | ((data: any) => string|any);

  /**
   * CSS classes for the header
   * 
   * 
   * @memberOf TableColumn
   */
  headerClass?: string | ((data: any) => string|any);

  /**
   * Header checkbox enabled
   * 
   * @type {boolean}
   * @memberOf TableColumn
   */
  headerCheckboxable?: boolean;

}
