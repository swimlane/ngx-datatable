# Table Options

* `columnMode`: The mode which the columns are distributed across the table. For example: `flex` will use flex-grow api, `force` will distribute proportionally and `standard` will just distrbute based on widths. Default value: `standard`
* `columns`: Array of columns to display.
* `count`: The total count of all rows. Default value: `0`
* `emptyMessage`: The text to display when there is no data. Default value: 'No data to display'
* `externalPaging`: Should the table use external paging vs client-side. Default value: `false`
* `footerHeight`: The height of the footer in pixels. Pass a `falsey` for no footer. Default value: `0`
* `headerHeight`: The height of the header in pixels. Pass a `falsey` for no header. Default value: `30`
* `limit`: The page size to be shown. Default value: `undefined`
* `loadingIndicator`: Show the linear loading bar. Default value: `false`
* `offset`: The current offset ( page - 1 ) shown. Default value: `0`
* `reorderable`: Column re-ordering enabled/disabled. Default value: `true`
* `rowHeight`: The height of the row. This is necessary for virtual scrolling in order to calculate height for the scrollbar.
* `scrollbarH`: Enabled horiztonal scrollbars. Default value: `false`
* `scrollbarV`: Enable vertical scrollbar for fixed height vs fluid. This is necessary for virtual scrolling. Default value: `false`
* `selectionType`: Type of row selection. Options are `single`, `multi` and `multiShift`. For no selection pass a `falsey`. Default value: `undefined`
* `sorts`: Array of sorted columns by property and type. Default value: `[]`
* `sortType`: Single vs Multi sorting. Default value: `single`
* `detailRowHeight`: Row height of the detail row
* `rowDetailTemplate`: Template for the row detail
