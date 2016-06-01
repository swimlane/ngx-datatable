/**
 * Returns the columns by pin.
 * @param {array} colsumns
 */
export function columnsByPin(cols){
  let ret = {
    left: [],
    center: [],
    right: []
  };

  if(cols) {
    for(let i=0, len=cols.length; i < len; i++) {
      let c = cols[i];
      if(c.frozenLeft){
        ret.left.push(c)
      } else if(c.frozenRight){
        ret.right.push(c);
      } else {
        ret.center.push(c);
      }
    }
  }

  return ret;
};

/**
 * Returns the widths of all group sets of a column
 * @param {object} groups
 * @param {array} all
 */
export function columnGroupWidths(groups, all){
  return {
    left: columnTotalWidth(groups.left),
    center: columnTotalWidth(groups.center),
    right: columnTotalWidth(groups.right),
    total: columnTotalWidth(all)
  };
}

/**
 * Calculates the total width of all columns and their groups
 * @param {array} columns
 * @param {string} property width to get
 */
export function columnTotalWidth(columns, prop) {
  let totalWidth = 0;

  if(columns) {
    for(let i=0, len=columns.length; i < len; i++) {
      let c = columns[i];
      let has = prop && c[prop];
      totalWidth = totalWidth + (has ? c[prop] : c.width);
    }
  }

  return totalWidth;
};
