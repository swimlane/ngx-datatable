import { getterForProp } from './column-prop-getters';
import { TableColumnProp } from '../types/table-column.type';
import { Row } from '../types/public.types';

export type OptionalValueGetter = (row: any) => any | undefined;
export function optionalGetterForProp(prop: TableColumnProp): OptionalValueGetter {
  return prop && (row => getterForProp(prop)(row, prop));
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
  rows: TRow[],
  from?: OptionalValueGetter,
  to?: OptionalValueGetter
): TRow[] {
  if (from && to) {
    const nodeById: Record<number, TreeNode<TRow>> = {};
    const l = rows.length;
    let node: TreeNode<TRow> | null = null;

    nodeById[0] = new TreeNode<TRow>({
      level: -1,
      treeStatus: 'expanded'
    } as unknown as TRow); // that's the root node, TODO: needs type that reflect this

    const uniqIDs = rows.reduce((arr, item) => {
      const toValue = to(item);
      if (arr.indexOf(toValue) === -1) {
        arr.push(toValue);
      }
      return arr;
    }, []);

    for (let i = 0; i < l; i++) {
      // make TreeNode objects for each item
      nodeById[to(rows[i])] = new TreeNode(rows[i]);
    }

    for (let i = 0; i < l; i++) {
      // link all TreeNode objects
      node = nodeById[to(rows[i])];
      let parent = 0;
      const fromValue = from(node.row);
      if (!!fromValue && uniqIDs.indexOf(fromValue) > -1) {
        parent = fromValue;
      }
      node.parent = nodeById[parent];
      node.row['level'] = node.parent.row['level'] + 1;
      node.parent.children.push(node);
    }

    let resolvedRows: any[] = [];
    nodeById[0].flatten(row => (resolvedRows = [...resolvedRows, row]));

    return resolvedRows;
  } else {
    return rows;
  }
}

class TreeNode<TRow extends Row> {
  public row: TRow;
  public parent: TreeNode<TRow>;
  public children: TreeNode<TRow>[];

  constructor(row: TRow) {
    this.row = row;
    this.parent = null;
    this.children = [];
  }

  flatten(f: (child: TreeNode<TRow>) => void) {
    if (this.row.treeStatus === 'expanded') {
      for (let i = 0, l = this.children.length; i < l; i++) {
        const child = this.children[i];
        f(child);
        child.flatten(f);
      }
    }
  }
}
