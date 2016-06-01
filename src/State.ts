import { id } from './utils/id';
import { camelCase } from './utils/camelCase';
import { tableDefaults } from './constants/defaults';
import { columnDefaults } from './constants/columnDefaults';

export class State {

  options: any;
  rows: [];
  selected: [];
  scrollbarWidth: number;

  internal = {
    offsetX: 0,
    offsetY: 0,
    innerWidth: 0,
    bodyHeight: 300
  };

  constructor(options = {}, rows = []) {
    this.transposeDefaults(options);
  	Object.assign(this, { options, rows });
  }

  transposeDefaults(options) {
    for(const attr in tableDefaults) {
      if(options[attr] === undefined) {
        options[attr] = tableDefaults[attr];
      }
    }
  }

  transposeColumnDefaults({ columns }) {
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