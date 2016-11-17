# Table Column Options

### `name`
Column label. If none specified, it will use the prop value and decamelize it.

### `prop`
The property to bind the row values to. If `undefined`, it will camelcase the name value.

### `flexGrow`
The grow factor relative to other columns. Same as the [flex-grow API](http =//www.w3.org/TR/css3-flexbox/). 
It will any available extra width and distribute it proportionally according to all columns' flexGrow values. Default value: `0`

### `minWidth`
Minimum width of the column in pixels. Default value: `100`

### `maxWidth`
Maximum width of the column in pixels. Default value: `undefined`

### `width`
The width of the column by default in pixels. Default value: `150`

### `resizeable`
The column can be resized manually by the user. Default value: `true`

### `comparator`
Custom sort comparator, used to apply custom sorting via client-side. See 
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) for more info.

### `sortable`
Sorting of the row values by this column. Default value: `true`

### `draggable`
The column can be dragged to re-order. Default value: `true`

### `canAutoResize`
Whether the column can automatically resize to fill extra space. Default value: `true`

### `cellTemplate`
Angular TemplateRef allowing you to author custom body cell templates

### `headerTemplate`
Angular TemplateRef allowing you to author custom header cell templates
