import { Section, SectionProp } from '../types';
import { getterForProp, ValueGetter } from './column-prop-getters';

export function sectionRows(rows: any[], prop: SectionProp, sections: Section[]) {
  const getter: ValueGetter = getterForProp(prop);

  // index sections by the section property value for fast lookup
  const sectionByValue = {};
  const sectionCounts = [];
  for (const sectionIndex in sections) {
    sectionByValue[sections[sectionIndex].propValue] = {
      index: sectionIndex,
      section: sections[sectionIndex]
    };
    sectionCounts[sectionIndex] = 0;
  }

  const rowSections = new Map();

  // reduce to only rows that are part of an open section and add a section index to each row
  rows = rows || [];
  let sectionedRows = rows.reduce((includedRows, row) => {
    const val = getter(row, prop);
    if (val in sectionByValue) {
      const sectionIndex = sectionByValue[val].index;
      rowSections.set(row, sectionIndex);
      sectionCounts[sectionIndex]++;
      if (sectionByValue[val].section.expanded) {
        includedRows.push(row);
      }
    }
    return includedRows;
  }, []);

  // add section header rows
  for (const sectionIndex in sections) {
    const sectionHeader = {...(sections[sectionIndex]), $$sectionIndex: sectionIndex, $$isSectionHeader: true};
    sectionedRows.push(sectionHeader);
  }

  sectionedRows = sectionedRows.sort((a, b) => {
    const aSection = a.$$isSectionHeader ? a.$$sectionIndex : rowSections.get(a);
    const bSection = b.$$isSectionHeader ? b.$$sectionIndex : rowSections.get(b);
    if (aSection === bSection) {
      if (a.$$isSectionHeader) {
        return -1;
      }
      if (b.$$isSectionHeader) {
        return 1;
      }
      return 0;
    }
    return +aSection < +bSection ? -1 : 1;
  });

  // sort by section index
  return {
    rows: sectionedRows,
    rowSections,
    sectionCounts
  };
}
