import { signal } from '@angular/core';

import { TableColumnInternal } from '../types/internal.types';
import { emptyStringGetter } from './column-prop-getters';
import { columnsByPinArr, gridColumnTemplate } from './column';
import { orderByComparator } from './sort';

describe('gridColumnTemplate', () => {
  it('should never emit negative px tracks', () => {
    const columns = [
      {
        $$id: 'd',
        $$valueGetter: emptyStringGetter,
        $$originalColumn: {},
        comparator: orderByComparator,
        prop: 'd',
        sortable: false,
        name: 'd',
        canAutoResize: true,
        width: signal(-45)
      }
    ] as TableColumnInternal[];

    expect(gridColumnTemplate(columnsByPinArr(columns))).toBe('0px');
  });
});
