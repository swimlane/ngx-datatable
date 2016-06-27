import { id } from '../utils/id';
import { camelCase } from '../utils/camelCase';

/**
 * Default Column Options
 * @type {object}
 */
export class TableColumn {

  // unique id
  $$id: string = id();

  // defines if its expressive
  isExpressive: boolean = false;

  // pinned to the left
  frozenLeft: boolean = false;

  // pinned to the right
  frozenRight: boolean = false;

  // The grow factor relative to other columns. Same as the flex-grow
  // API from http =//www.w3.org/TR/css3-flexbox/. Basically;
  // take any available extra width and distribute it proportionally
  // according to all columns' flexGrow values.
  flexGrow: number = 0;

  // Minimum width of the column.
  minWidth: number = 100;

  //Maximum width of the column.
  maxWidth: number = undefined;

  // The width of the column; by default (in pixels).
  width: number = 150;

  // If yes then the column can be resized; otherwise it cannot.
  resizable: boolean = true;

  // Custom sort comparator
  comparator: any = undefined;

  // If yes then the column can be sorted.
  sortable: boolean = true;

  // can column be dragged
  draggable: boolean = true;

  // Whether the column can automatically resize to fill space in the table.
  canAutoResize: boolean = true;

  // column name / label
  name: string;

  // property to bind to on the row
  prop: string;

  constructor(props: any) {
    Object.assign(this, props);

    if(!this.prop && this.name) {
      this.prop = camelCase(this.name);
    }
  }
};
