import { Section, SectionProp } from '../types';
import { getterForProp, ValueGetter } from './column-prop-getters';

export function sectionRows(rows: any[], prop: SectionProp, sections: Section[]) {
  const getter: ValueGetter = getterForProp(prop);

  // index sections by the section property value for fast lookup
  const sectionByValue = {};
  for (const sectionIndex in sections) {
    sectionByValue[sections[sectionIndex].propValue] = {
      index: sectionIndex,
      section: sections[sectionIndex]
    };
  }

  // reduce to only rows that are part of a section and add a section index to each row
  rows = rows || [];
  const sectionedRows = rows.reduce((includedRows, row) => {
    const val = getter(row, prop);
    if (val in sectionByValue) {
      row.$$sectionIndex = sectionByValue[val].index;
      includedRows.push(row);
    }
    return includedRows;
  }, []);

  // add section header rows
  for (const sectionIndex in sections) {
    sectionedRows.push({...(sections[sectionIndex]), $$sectionIndex: sectionIndex, $$isSectionHeader: true});
  }

  // sort by section index
  return sectionedRows.sort((a, b) => {
    if (a.$$sectionIndex === b.$$sectionIndex) {
      if (a.$$isSectionHeader) {
        return -1;
      }
      if (b.$$isSectionHeader) {
        return 1;
      }
      return 0;
    }
    return +a.$$sectionIndex < +b.$$sectionIndex ? -1 : 1;
  });
}
