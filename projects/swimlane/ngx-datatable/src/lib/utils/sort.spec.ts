import { toInternalColumn } from './column-helper';
import { sortRows } from './sort';

describe('sortRows', () => {
  const columns = toInternalColumn([
    { prop: 'name', sortable: false },
    { prop: 'age', sortable: true }
  ]);

  const rows = [
    { name: 'Zed', age: 40 },
    { name: 'Ada', age: 30 },
    { name: 'Moe', age: 20 }
  ];

  it('should still sort when a sort dir targets a non-sortable column', () => {
    const sorted = sortRows(rows, columns, [
      { prop: 'name', dir: 'asc' },
      { prop: 'age', dir: 'asc' }
    ]);

    expect(sorted.map(row => row.age)).toEqual([20, 30, 40]);
  });

  it('should ignore sort dirs that target missing columns', () => {
    const sorted = sortRows(rows, columns, [
      { prop: 'missing', dir: 'asc' },
      { prop: 'age', dir: 'desc' }
    ]);

    expect(sorted.map(row => row.age)).toEqual([40, 30, 20]);
  });
});
