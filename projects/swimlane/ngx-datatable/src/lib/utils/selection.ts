export const selectRows = <TRow>(selected: TRow[], row: TRow, comparefn: any) => {
  const selectedIndex = comparefn(row, selected);

  if (selectedIndex > -1) {
    selected.splice(selectedIndex, 1);
  } else {
    selected.push(row);
  }

  return selected;
};

export const selectRowsBetween = <TRow>(
  rows: (TRow | undefined)[],
  index: number,
  prevIndex: number
): TRow[] => {
  const reverse = index < prevIndex;
  const rangeRows: TRow[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const greater = i >= prevIndex && i <= index;
    const lesser = i <= prevIndex && i >= index;

    let range = { start: 0, end: 0 };
    if (reverse) {
      range = {
        start: index,
        end: prevIndex
      };
    } else {
      range = {
        start: prevIndex,
        end: index + 1
      };
    }

    if ((reverse && lesser) || (!reverse && greater)) {
      if (i >= range.start && i <= range.end && row) {
        rangeRows.push(row);
      }
    }
  }

  return rangeRows;
};
