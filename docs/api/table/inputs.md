# Table Inputs

## `columnMode`

Method used for setting column widths

| Value      | Description                 | Default |
| ---------- | --------------------------- | ------- |
| `standard` | Distributes based on widths | x       |
| `flex`     | Uses flex-grow API          |         |
| `force`    | Distributes proportionally  |         |

## `columns`

Array of columns to display

## `count`

Total count of all rows. Default value: `0`

## `cssClasses`

Custom CSS classes that can be defined to override the icons classes for up/down in sorts and
previous/next in the pager. Defaults:

```
sortAscending: 'datatable-icon-down',
sortDescending: 'datatable-icon-up',
pagerLeftArrow: 'datatable-icon-left',
pagerRightArrow: 'datatable-icon-right',
pagerPrevious: 'datatable-icon-prev',
pagerNext: 'datatable-icon-skip'
```

## `externalPaging`

Use external paging instead of client-side paging. Default value: `false`

## `externalSorting`

Use external sorting instead of client-side sorting. Default value: `false`

## `footerHeight`

The height of the footer in pixels. Pass a `falsey` for no footer. Default value: `0`

## `headerHeight`

The height of the header in pixels. Pass a falsy value for no header. Default value: `30`

## `messages`

Static messages in the table you can override for localization.

```
{
  // Message to show when array is presented
  // but contains no values
  emptyMessage: 'No data to display',

  // Footer total message
  totalMessage: 'total',

  // Footer selected message
  selectedMessage: 'selected'
}
```

## `limit`

Page size to show. Default value: `undefined`

## `loadingIndicator`

Show the linear loading bar. Default value: `false`

## `offset`

Current offset ( page - 1 ) shown. Default value: `0`

## `reorderable`

Column re-ordering enabled/disabled. Default value: `true`

## `swapColumns`

Swap columns on re-order columns or move them. Default value: `true`

## `rowHeight`: `Function|number|undefined`

The height of the row.

When virtual scrolling is not in use, you can pass `undefined` for fluid heights.

If using virtual scrolling, you must pass a function or a number to calculate
the heights.

Using a function, you can set the height of individual rows:

```
(row) => {
  // set default
  if (!row) return 50;

  // return my height
  return row.height;
}
```

## `rowIdentity`

Function for uniquely identifying a row, used to track and compare when displaying and selecting rows. Example:

```
(row) => {
  return row.guid;
}
```

## `rows`

Array of rows to display.

## `scrollbarH`

Use horizontal scrollbar. Default value: `false`

## `scrollbarV`

Use vertical scrollbar for fixed height vs fluid. This is necessary for virtual scrolling. Default value: `false`

## `selectCheck`

A boolean or function you can use to check whether you want
to select a particular row based on a criteria. Example:

```
(row, column, value) => {
  return value !== 'Ethel Price';
}
```

## `displayCheck`

Function to determine whether to show a checkbox for a row. Example:

```
(row, column, value) => {
  return row.name !== 'Ethel Price';
}
```

## `selected`

List of row objects that should be represented as selected in the grid. Rows are compared using
object equality. For custom comparisons, use the `selectCheck` function.

Default value: `[]`

## `selectionType`

Row selection mode

| Value                  | Description                                           | Default |
| :--------------------- | :---------------------------------------------------- | ------- |
| `undefined|false|null` | Rows cannot be selected                               | x       |
| `"single"`             | One row can be selected at a time                     |         |
| `"cell"`               | One cell can be selected at a time                    |         |
| `"multi"`              | Multiple rows can be selected using Ctrl or Shift key |         |
| `"multiClick"`         | Multiple rows can be selected by clicking             |         |
| `"checkbox"`           | Multiple rows can be selected using checkboxes        |         |

## `sorts`

Ordered array of objects used to determine sorting by column. Objects contain the column name, `prop`, and sorting direction, `dir`. Default value: `[]`. Example:

```javascript
[
  {
    prop: 'name',
    dir: 'desc'
  },
  {
    prop: 'age',
    dir: 'asc'
  }
];
```

## `sortType`

Sorting mode, whether `"single"` or `"multi"`. In `"single"` mode, clicking on a column name
will reset the existing sorting before sorting by the new selection. In multi selection mode,
additional clicks on column names will add sorting using multiple columns.

Default value: `"single"`

## `trackByProp`

A property on the row object that uniquely identifies the row. Example: `"name"`

## `rowClass`

Function used to populate a row's CSS classes. The function will take a row and
return a string or object, as shown below:

```
(row) => {
  return {
    'old': row.age > 50,
    'young': row.age <= 50,
    'woman': row.gender === 'female',
    'man': row.gender === 'male'
  }
}
```

## `virtualization`

Use virtual scrolling. Default: `true`
