# Table Outputs
All outputs are Angular2 `EventEmitter`ers.

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

### `resize`
Column was resized.

```
{
  column
  newValue
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

### `detailToggle`
Row detail row was toggled.

```
{
  rows
  currentIndex
}
```

### `select`
A cell or row was selected.

```
{
  selected
}
```

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

### `scroll`
Body was scrolled typically in a `scrollbarV:true` scenario.

```
{
  offsetX
  offsetY
}
```
