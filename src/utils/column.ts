/**
 * Returns the columns by pin.
 * @param {array} cols
 */
export function columnsByPin(cols) {
  let ret = {
    left: [],
    center: [],
    right: []
  };

  if(cols) {
    for(let col of cols) {
      if(col.frozenLeft) {
        ret.left.push(col);
      } else if(col.frozenRight) {
        ret.right.push(col);
      } else {
        ret.center.push(col);
      }
    }
  }

  return ret;
}

/**
 * Returns the widths of all group sets of a column
 * @param {object} groups
 * @param {array} all
 */
export function columnGroupWidths(groups, all) {
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
 * @param {string} prop width to get
 */
export function columnTotalWidth(columns, prop?) {
  let totalWidth = 0;

  if(columns) {
    for(let c of columns) {
      const has = prop && c[prop];
      const width = has ? c[prop] : c.width;
      totalWidth = totalWidth + parseInt(width, 0);
    }
  }

  return totalWidth;
}

/**
 * Calculates the total width of all columns and their groups
 * @param {array} columns
 * @param {string} property width to get
 */
export function columnsTotalWidth(columns: any, prop?: any) {
  let totalWidth = 0;

  for(let column of columns) {
    const has = prop && column[prop];
    totalWidth = totalWidth + (has ? column[prop] : column.width);
  }

  return totalWidth;
}

export function columnsByPinArr(val) {
  let colsByPinArr = [];
  const colsByPin = columnsByPin(val);

  colsByPinArr.push({ type: 'left', columns: colsByPin['left'] });
  colsByPinArr.push({ type: 'center', columns: colsByPin['center'] });
  colsByPinArr.push({ type: 'right', columns: colsByPin['right'] });

  return colsByPinArr;
}
