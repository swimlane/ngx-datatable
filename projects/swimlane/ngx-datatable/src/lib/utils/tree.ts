import { getterForProp } from './column-prop-getters';
import { TableColumnProp } from '../types/table-column.type';
import { Row } from '../types/public.types';

export type OptionalValueGetter = ((row: any) => any) | undefined;
export function optionalGetterForProp(prop: TableColumnProp | undefined): OptionalValueGetter {
  return prop ? row => getterForProp(prop)(row, prop) : undefined;
}

/**
 * This functions rearrange items by their parents
 * Also sets the level value to each of the items
 *
 * Note: Expecting each item has a property called parentId
 * Note: This algorithm will fail if a list has two or more items with same ID
 * NOTE: This algorithm will fail if there is a deadlock of relationship
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
export function groupRowsByParents<TRow extends Row>(
  rows: (TRow | undefined)[],
  from?: OptionalValueGetter,
  to?: OptionalValueGetter
): (TRow | undefined)[] {
  if (from && to) {
    const treeRows = rows.filter(row => !!row).map(row => new TreeNode(row));
    const uniqIDs = new Map(treeRows.map(node => [to(node.row), node]));

    const rootNodes = treeRows.reduce((root, node) => {
      const fromValue = from(node.row);
      const parent = uniqIDs.get(fromValue);
      if (parent) {
        node.row.level = parent.row.level! + 1; // TODO: should be reflected by type, that level is defined
        node.parent = parent;
        parent.children.push(node);
      } else {
        node.row.level = 0;
        root.push(node);
      }
      return root;
    }, [] as TreeNode<TRow>[]);

    return rootNodes.flatMap(child => child.flatten());
  } else {
    return rows;
  }
}

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
