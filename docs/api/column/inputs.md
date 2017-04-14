# Table Column Options

### `name`: `string`
Column label. If none specified, it will use the prop value and decamelize it.

### `prop`: `string`
The property to bind the row values to. If `undefined`, it will camelcase the name value.

### `flexGrow`: `number`
The grow factor relative to other columns. Same as the [flex-grow API](http =//www.w3.org/TR/css3-flexbox/). 
It will any available extra width and distribute it proportionally according to all columns' flexGrow values. Default value: `0`

### `minWidth`: `number`
Minimum width of the column in pixels. Default value: `100`

### `maxWidth`: `number`
Maximum width of the column in pixels. Default value: `undefined`

### `width`: `number`
The width of the column by default in pixels. Default value: `150`

### `resizeable`: `boolean`
The column can be resized manually by the user. Default value: `true`

### `comparator`
Custom sort comparator, used to apply custom sorting via client-side. See 
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) for more info.

### `sortable`: `boolean`
Sorting of the row values by this column. Default value: `true`

### `draggable`: `boolean`
The column can be dragged to re-order. Default value: `true`

### `canAutoResize`: `boolean`
Whether the column can automatically resize to fill extra space. Default value: `true`

### `cellTemplate`: `TemplateRef`
Angular TemplateRef allowing you to author custom body cell templates

### `headerTemplate`: `TemplateRef`
Angular TemplateRef allowing you to author custom header cell templates

### `checkboxable`: `boolean`
Indicates whether the column should show a checkbox component for selection. Only
applicable when the selection mode is `checkbox`.

### `headerCheckboxable`: `boolean`
Indicates whether the column should show a checkbox component in the header cell.
Only applicable when the selection mode is `checkbox`.

## `headerClass`: `string|Function`
Header CSS classes to apply to the header cell

## `cellClass`: `string|Function`
Cell classes to apply to the body cell
