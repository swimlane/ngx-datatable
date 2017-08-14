import { RowGroup, RowGroupProp } from '../types';
import { getterForProp, ValueGetter } from './column-prop-getters';

export function groupRows(rows: any[], prop: RowGroupProp, groups: RowGroup[]) {
  const getter: ValueGetter = getterForProp(prop);

  // index groups by the group property value for fast lookup
  const groupByValue = {};
  for (const groupIndex in groups) {
    groupByValue[groups[groupIndex].propValue] = {
      index: groupIndex,
      group: groups[groupIndex]
    };
  }

  // reduce to only rows that are part of a group and add a group index to each row
  const groupedRows = rows.reduce((includedRows, row) => {
    const val = getter(row, prop);
    if (val in groupByValue) {
      row.$$groupIndex = groupByValue[val].index;
      includedRows.push(row);
    }
    return includedRows;
  }, []);

  // add group header rows
  for (const groupIndex in groups) {
    groupedRows.push({...(groups[groupIndex]), $$groupIndex: groupIndex, $$isRowGroupHeader: true, id: 0, height: 59});
  }

  console.log('GR', groupedRows);

  // sort by group index
  return groupedRows.sort((a, b) => {
    if (a.$$groupIndex === b.$$groupIndex) {
      if (a.$$isRowGroupHeader) {
        return -1;
      }
      if (b.$$isRowGroupHeader) {
        return 1;
      }
      return 0;
    }
    return a.$$groupIndex < b.$$groupIndex ? -1 : 1;
  });
}
