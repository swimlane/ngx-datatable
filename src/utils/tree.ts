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
 * TODO: This is a bruteforce solution, need to find a better one
 *
 * @param rows
 *
 */
export function groupRowsByParents(rows: any[]): any[] {
  const childrenMap = {};

  for (let i = 0; i < rows.length; i++) {
    childrenMap[rows[i].id] = {
      children: rows.filter(row => row.parentId === rows[i].id),
      checked: false
    };
  }
  const allRootItems = rows.filter(row => row.parentId === null);
  let opArray = rearrange(allRootItems, childrenMap, 0);

  // Now add items to the list whose parent is not present
  // Setting all of their levels as 0
  // TODO: This gets added at the end, need to maintain the order
  opArray = [...opArray, ...rows.filter(row => {
    return !childrenMap[row.id].checked;
  }).map(item => {
    item.level = 0;
    return item;
  })];

  return opArray;
}

function rearrange(items: any[], map: object, level: number, show: boolean = true): any[] {
  if (!items.length) return [];
  let op: any[] = [];
  items.forEach(item => {
    map[item.id].checked = true;
    item.level = level;
    if (show) {
      op = [
        ...op,
        item,
        ...rearrange(map[item.id].children, map, level + 1, item.treeStatus === 'expanded')
      ];
    } else {
      op = [...op];
      rearrange(map[item.id].children, map, level + 1, false);
    }
  });
  return op;
}
