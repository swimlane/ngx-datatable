# Table Inputs

## `columnMode`
The mode which the columns are distributed across the table. For example: `flex` will use flex-grow api, `force` will distribute proportionally and `standard` will just distrbute based on widths. Default value: `standard`

## `columns`
Array of columns to display.

## `count`
The total count of all rows. Default value: `0`

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
Should the table use external paging vs client-side. Default value: `false`

## `externalSorting`
Should the table use external sorting vs client-side. Default value: `false`

## `footerHeight`
The height of the footer in pixels. Pass a `falsey` for no footer. Default value: `0`

## `headerHeight`
The height of the header in pixels. Pass a `falsey` for no header. Default value: `30`

## `messages`
Static messages in the table you can override for localization.

```
{
  // Message to show when array is presented
  // but contains no values
  emptyMessage: 'No data to display',

  // Footer total message
  totalMessage: 'total'
}
```

## `limit`
The page size to be shown. Default value: `undefined`.

## `loadingIndicator`
Show the linear loading bar. Default value: `false`

## `offset`
The current offset ( page - 1 ) shown. Default value: `0`

## `reorderable`
Column re-ordering enabled/disabled. Default value: `true`

## `rowHeight`: `Function|number|undefined`
The height of the row. 

Pass undefined for fluid heights, this is not possible in virtual scrolling.

If using virtual scrolling, you must pass a function or a number to caculate
the heights.

Using a function, you can bind individual row heights such as:

```javascript
getRowHeight(row) {
  // set default
  if(!row) return 50;

  // return my height
  return row.height; 
}
```

## `rowIdentity`
This will be used when displaying or selecting rows.
When tracking/comparing them, we'll use the value of this fn 
`(fn(x) === fn(y)` instead of `(x === y)`.

## `rows`
Array of rows to display.

## `scrollbarH`
Enabled horizontal scrollbars. Default value: `false`

## `scrollbarV`
Enable vertical scrollbar for fixed height vs fluid. This is necessary for virtual scrolling. Default value: `false`

## `selectCheck`
A boolean/function you can use to check whether you want
to select a particular row based on a criteria. Example:

```
(row, column, value) => { return value !== 'Ethel Price'; }
```

## `selected`
List of row objects that should be represented as selected in the grid. It does object
equality, for prop checking use the `selectCheck` function.

Default value: `[]`

## `selectionType`
Type of row selection. Options are `single`, `multi`, `multiClick` and `chkbox`. 
For no selection pass a `falsey`. Default value: `undefined`

## `sorts`
Array of sorted columns by property and type. Default value: `[]`

## `sortType`
Single vs Multi sorting. When in single mode, any click after the initial click
will replace the current selection with the next selection. In multi selection mode,
any incremental click will add to the current selection array.

Default value: `single`

## `trackByProp`
A property on the row object that uniquely identifies the row. Example: `name`

## `rowClass`
A function that will invoked with each row's properties. The result of the function
can be a string or object with key/boolean like:

```javascript
getRowClass(row) {
  return {
    'is-age-10': row.age === 10
  }
}
```
