import { ValueGetter } from '../utils/column-prop-getters';

export type RowGroupProp = string|number;

export interface RowGroup {

  /**
   * Value of the group property to include in this group.
   *
   * @type {any}
   * @memberOf RowGroup
   */
  propValue?: any;

  /**
   * Group title
   *
   * @type {string}
   * @memberOf RowGroup
   */
  title?: string;
}


