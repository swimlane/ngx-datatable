import { groupRowsByParents, optionalGetterForProp } from './tree';

interface TreeRow {
  id: number;
  parentId: number;
  level?: number;
  treeStatus?: 'expanded' | 'collapsed' | 'disabled' | 'loading';
}

const fromGetter = optionalGetterForProp('parentId');
const toGetter = optionalGetterForProp('id');

const expanded = (row: Partial<TreeRow>): TreeRow =>
  ({ treeStatus: 'expanded', ...row }) as TreeRow;

describe('groupRowsByParents', () => {
  it('should compute level=0 for root rows and level=1 for direct children when parent precedes child', () => {
    const rows: TreeRow[] = [expanded({ id: 1, parentId: 0 }), expanded({ id: 2, parentId: 1 })];

    const result = groupRowsByParents(rows, fromGetter, toGetter) as TreeRow[];

    expect(result.map(r => r.id)).toEqual([1, 2]);
    expect(result[0].level).toBe(0);
    expect(result[1].level).toBe(1);
  });

  it('should compute correct level when a child appears before its parent in the input array', () => {
    // Regression: previously produced level = NaN for the child.
    const rows: TreeRow[] = [expanded({ id: 2, parentId: 1 }), expanded({ id: 1, parentId: 0 })];

    const result = groupRowsByParents(rows, fromGetter, toGetter) as TreeRow[];

    for (const row of result) {
      expect(Number.isNaN(row.level)).toBe(false);
      expect(typeof row.level).toBe('number');
    }

    const byId = new Map(result.map(r => [r.id, r]));
    expect(byId.get(1)!.level).toBe(0);
    expect(byId.get(2)!.level).toBe(1);
  });

  it('should compute correct levels for arbitrarily ordered deep trees', () => {
    // Tree:
    //   1
    //   ├── 3
    //   │   └── 6
    //   └── 4
    //   2
    //   └── 5
    const rows: TreeRow[] = [
      expanded({ id: 6, parentId: 3 }),
      expanded({ id: 5, parentId: 2 }),
      expanded({ id: 3, parentId: 1 }),
      expanded({ id: 4, parentId: 1 }),
      expanded({ id: 1, parentId: 0 }),
      expanded({ id: 2, parentId: 0 })
    ];

    const result = groupRowsByParents(rows, fromGetter, toGetter) as TreeRow[];

    const byId = new Map(result.map(r => [r.id, r]));
    expect(byId.get(1)!.level).toBe(0);
    expect(byId.get(2)!.level).toBe(0);
    expect(byId.get(3)!.level).toBe(1);
    expect(byId.get(4)!.level).toBe(1);
    expect(byId.get(5)!.level).toBe(1);
    expect(byId.get(6)!.level).toBe(2);

    for (const row of result) {
      expect(Number.isNaN(row.level)).toBe(false);
    }
  });

  it('should treat orphans (parent not in list) as root rows with level=0', () => {
    const rows: TreeRow[] = [
      expanded({ id: 7, parentId: 8 }) // parent 8 does not exist
    ];

    const result = groupRowsByParents(rows, fromGetter, toGetter) as TreeRow[];

    expect(result).toHaveLength(1);
    expect(result[0].level).toBe(0);
  });

  it('should not loop forever on cyclic relationships and should assign finite numeric levels', () => {
    const rows: TreeRow[] = [expanded({ id: 1, parentId: 2 }), expanded({ id: 2, parentId: 1 })];

    const result = groupRowsByParents(rows, fromGetter, toGetter) as TreeRow[];

    expect(result).toHaveLength(rows.length);
    for (const row of result) {
      expect(Number.isFinite(row.level!)).toBe(true);
      expect(Number.isNaN(row.level)).toBe(false);
    }
  });

  it('should return rows unchanged when no from/to getters are provided', () => {
    const rows: TreeRow[] = [expanded({ id: 2, parentId: 1 }), expanded({ id: 1, parentId: 0 })];

    const result = groupRowsByParents(rows);
    expect(result).toBe(rows);
  });

  it('should not include children of collapsed parents in the flattened output', () => {
    const rows: TreeRow[] = [
      { id: 1, parentId: 0, treeStatus: 'collapsed' },
      { id: 2, parentId: 1, treeStatus: 'expanded' }
    ];

    const result = groupRowsByParents(rows, fromGetter, toGetter) as TreeRow[];

    expect(result.map(r => r.id)).toEqual([1]);
    // Level should still be assigned correctly even if not rendered.
    expect(rows[1].level).toBe(1);
  });

  it('should preserve input-order sibling ordering when a grandchild appears before a sibling', () => {
    const rows: TreeRow[] = [
      expanded({ id: 1, parentId: 0 }),
      expanded({ id: 4, parentId: 1 }),
      expanded({ id: 3, parentId: 2 }),
      expanded({ id: 2, parentId: 1 })
    ];

    const result = groupRowsByParents(rows, fromGetter, toGetter) as TreeRow[];

    expect(result.map(r => r.id)).toEqual([1, 4, 2, 3]);
  });
});
