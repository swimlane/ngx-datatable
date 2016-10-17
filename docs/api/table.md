# Table

### Inputs
* `options`: The options for the table. Required.
* `rows`: Array of objects for which the table with render. This can be empty on init and fulfilled later by a AJAX response.
* `selected`: Array of rows selected.

### Outputs
All outputs are Angular2 `EventEmitter`.

* `onPageChange`: Triggered when the data-table is paged. Arguments: `offset, limit, pageCount`
* `onRowsUpdate`: Triggered when the data-table rows have been updated.
* `onRowClick`: Triggered when a row was clicked. Arguments: `row`
* `onSelectionChange`: Triggered when a selection has changed ( added or removed ). Arguments: `selected`
* `onColumnChange`: Triggered when a column is sorted, reordered or resized. Arguments: `{ type: 'sort|drag|resize', value: column }`

### Methods
* `toggleExpandRow(row)`: Toggle expand/collapse a row detail when using row detail templates.
* `expandAllRows()`: Expand all row details when using row detail templates.
* `collapseAllRows()`: Collapse all row details when using row detail templates.
