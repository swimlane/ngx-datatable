import { id } from './utils/id';
import { camelCase } from './utils/camelCase';
import { columnsByPin, columnGroupWidths } from './utils/column';

import { tableDefaults } from './constants/defaults';
import { columnDefaults } from './constants/columnDefaults';

export class State {

  options: Object;
  rows: Array<Object>;
  selected: Array<Object>;
  scrollbarWidth: number;

  internal = {
    offsetX: 0,
    offsetY: 0,
    innerWidth: 0,
    bodyHeight: 300
  };

  get columnsByPin() {
    return columnsByPin(this.options.columns);
  }

  get columnGroupWidths() {
    return columnGroupWidths(this.columnsByPin, this.options.columns);
  }

  constructor(
    options: Object = {},
    rows: Array<Object> = [],
    selected: Array<Object> = []) {
    this.transposeDefaults(options);
  	Object.assign(this, { options, rows });
  }

  transposeDefaults(options) {
    for(const attr in tableDefaults) {
      if(options[attr] === undefined) {
        options[attr] = tableDefaults[attr];
      }
    }

    this.transposeColumnDefaults(options.columns);
  }

  transposeColumnDefaults(columns) {
    for(let column of columns) {
      column.$id = id();

      for(const attr in columnDefaults) {
        if(column[attr] === undefined) {
          column[attr] = columnDefaults[attr];
        }
      }

      if(column.name && !column.prop) {
        column.prop = camelCase(column.name);
      }
    }
  }

}
