import { Row } from '../types/public.types';
import { TableColumnProp } from '../types/table-column.type';
import { getterForProp } from './column-prop-getters';

export type OptionalValueGetter = ((row: any) => any) | undefined;
export const optionalGetterForProp = (prop: TableColumnProp | undefined): OptionalValueGetter => {
  return prop ? row => getterForProp(prop)(row, prop) : undefined;
};

/**
 * This functions rearrange items by their parents
 * Also sets the level value to each of the items
 *
 * Note: Expecting each item has a property called parentId
 * Note: This algorithm will fail if a list has two or more items with same ID
 * Note: Cyclic relationships are broken by treating one node in the cycle as a root
 *
 * For example,
 *
 * Input
 *
 * id -> parent
 * 1  -> 0
 * 2  -> 0
 * 3  -> 1
 * 4  -> 1
 * 5  -> 2
 * 7  -> 8
 * 6  -> 3
 *
 *
 * Output
 * id -> level
 * 1      -> 0
 * --3    -> 1
 * ----6  -> 2
 * --4    -> 1
 * 2      -> 0
 * --5    -> 1
 * 7     -> 8
 *
 *
 * @param rows
 *
 */
export const groupRowsByParents = <TRow extends Row>(
  rows: (TRow | undefined)[],
  from?: OptionalValueGetter,
  to?: OptionalValueGetter
): (TRow | undefined)[] => {
  if (from && to) {
    const treeRows = rows.filter(row => !!row).map(row => new TreeNode(row));
    const uniqIDs = new Map(treeRows.map(node => [to(node.row), node]));

    const resolved = new Set<TreeNode<TRow>>();
    const resolveLevel = (node: TreeNode<TRow>, visited: Set<TreeNode<TRow>>): number => {
      if (resolved.has(node)) {
        return node.row.level!;
      }
      if (visited.has(node)) {
        return Infinity;
      }
      visited.add(node);

      const parent = uniqIDs.get(from(node.row));
      if (parent && parent !== node) {
        const parentLevel = resolveLevel(parent, visited);
        if (parentLevel !== Infinity) {
          node.row.level = parentLevel + 1;
        } else {
          node.row.level = 0;
        }
      } else {
        node.row.level = 0;
      }

      visited.delete(node);
      resolved.add(node);
      return node.row.level;
    };

    for (const node of treeRows) {
      if (!resolved.has(node)) {
        resolveLevel(node, new Set());
      }
    }

    for (const node of treeRows) {
      const parent = uniqIDs.get(from(node.row));
      if (parent && parent !== node && node.row.level! > 0) {
        node.parent = parent;
        parent.children.push(node);
      }
    }

    const rootNodes = treeRows.filter(n => !n.parent);

    return rootNodes.flatMap(child => child.flatten());
  } else {
    return rows;
  }
};

class TreeNode<TRow extends Row> {
  public row: TRow;
  public parent?: TreeNode<TRow>;
  public children: TreeNode<TRow>[];

  constructor(row: TRow) {
    this.row = row;
    this.children = [];
  }

  flatten(): TRow[] {
    if (this.row.treeStatus === 'expanded') {
      return [this.row, ...this.children.flatMap(child => child.flatten())];
    } else {
      return [this.row];
    }
  }
}

export const expandToRow = <TRow extends Row>(
  targetRow: TRow,
  rows: (TRow | undefined)[],
  from?: OptionalValueGetter,
  to?: OptionalValueGetter
) => {
  if (from && to) {
    const uniqIDs = new Map(rows.filter(row => !!row).map(node => [to(node), node]));
    const visitedRowIds = new Set<unknown>();
    let currentRow: TRow | undefined = targetRow;

    while (currentRow) {
      const currentRowId = to(currentRow);
      if (visitedRowIds.has(currentRowId)) {
        // cycle detected, abort to avoid an infinite loop
        break;
      }
      visitedRowIds.add(currentRowId);

      if (currentRow.treeStatus === 'collapsed') {
        currentRow.treeStatus = 'expanded';
      }
      currentRow = uniqIDs.get(from(currentRow));
    }
  }
};
