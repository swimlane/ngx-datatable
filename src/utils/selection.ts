export function selectRows(selected, row) {
  const selectedIndex = selected.indexOf(row);

  if(selectedIndex > -1){
    selected.splice(selectedIndex, 1);
  } else {
    selected.push(row);
  }

  return selected;
}

export function selectRowsBetween(selected, rows, index, prevIndex) {
  const reverse = index < prevIndex;

  for(var i = 0, len = rows.length; i < len; i++) {
    const row = rows[i];
    const greater = i >= prevIndex && i <= index;
    const lesser = i <= prevIndex && i >= index;

    let range = { start: 0, end: 0 };
    if (reverse) {
      range = {
        start: index,
        end: (prevIndex - index)
      };
    } else {
      range = {
        start: prevIndex,
        end: index + 1
      };
    }

    if((reverse && lesser) || (!reverse && greater)){
      const idx = selected.indexOf(row);

      // if reverse shift selection (unselect) and the
      // row is already selected, remove it from selected
      if (reverse && idx > -1) {
        selected.splice(idx, 1);
        continue;
      }

      // if in the positive range to be added to `selected`, and
      // not already in the selected array, add it
      if( i >= range.start && i < range.end){
        if (idx === -1) {
          selected.push(row);
        }
      }
    }
  }

  return selected;
}
