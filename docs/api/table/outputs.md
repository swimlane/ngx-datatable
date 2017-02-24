# Table Outputs
All outputs are Angular2 `EventEmitter`ers.

### `activate`
A cell or row was focused via keyboard or mouse click.

```
{
  type: 'keydown'|'click'|'dblclick'
  event
  row
  column
  value
  cellElement
  rowElement
}
```

### `detailToggle`
Row detail row was toggled.

```
{
  rows
  currentIndex
}
```

### `page`
The table was paged either triggered by the pager or the body scroll.

```
{
  count
  pageSize
  limit
  offset
}
```

### `reorder` 
Columns were re-ordered.

```
{
  column
  newValue
  prevValue
}
```

### `resize`
Column was resized.

```
{
  column
  newValue
}
```

### `tableContextmenu`
The context menu was invoked on the table.

```
{
  event,
  type,
  content
}
```

### `scroll`
Body was scrolled typically in a `scrollbarV:true` scenario.

```
{
  offsetX
  offsetY
}
```

### `select`
A cell or row was selected.

```
{
  selected
}
```

### `sort`
Column sort was invoked.

```
{
  sorts
  column
  prevValue
  newValue
}
```
