import { PipeTransform } from '@angular/core';
import { id, camelCase} from '../utils';

/**
 * Default Column Options
 * @type {object}
 */
export class TableColumn {

  static getProps() {
    let props = ['name', 'prop'];
    let col = new TableColumn();

    for(const prop in col) {
      props.push(prop);
    }

    return props;
  }

  // unique id
  $$id: string = id();

  // used internally for resize calcs
  $$oldWidth: number;

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
  get minWidth(): number {
    return this._minWidth;
  }
  set minWidth(value: number) {
    this._minWidth = +value;
  }

  // Maximum width of the column.
  maxWidth: number = undefined;

  // The width of the column; by default (in pixels).
  get width(): number {
    return this._width;
  }
  set width(value: number) {
    this._width = +value;
  }

  // If yes then the column can be resized; otherwise it cannot.
  resizeable: boolean = true;

  // Custom sort comparator
  comparator: any = undefined;

  // Custom pipe
  pipe: PipeTransform = null;

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

  // ng2 template ref
  cellTemplate: any;

  // ng2 template ref
  headerTemplate: any;

  private _width: number = 150;
  private _minWidth: number = 0;

  constructor(props?: any) {
    Object.assign(this, props);

    if(!this.prop && this.name) {
      this.prop = camelCase(this.name);
    }

    // for some reason these are not getting set
    if(props && props.templates) {
      this.headerTemplate = props.headerTemplate;
      this.cellTemplate = props.cellTemplate;
    }
  }

}
