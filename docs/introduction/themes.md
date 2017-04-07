# Themes

Out of the box, the data-table is not styled. This gives you maximum flexibility.

There is a separate material theme distributed with data-table. In order to use it, you need to 
include that in your application `release/material.css` and add the CSS class `material` to your data-table.

This is a simple way to apply the style of the demo.
```scss
@import '~@swimlane/ngx-datatable/release/index.css';
@import '~@swimlane/ngx-datatable/release/themes/material.css';
@import '~@swimlane/ngx-datatable/release/assets/icons.css';
```
You can just add above to your `scss` file and then specify the class of your ngx-datatable to `<ngx-datatable class="material">`

## CSS Classes
- `ngx-datatable`: Master Table class
  - `fixed-header`: The header is fixed on the table

- `datatable-header`: Header row class
  - `datatable-header-cell`: Header cell class
    - `resizeable`: Cell resizeable class
    - `sortable`: Cell drag/drop sortable class
    - `longpress`: Cell long-press activated
    - `dragging`: Cell dragging activated
    - `sort-active`: Sort active on column
    - `sort-asc`: Sort active on column with ascending applied
    - `sort-desc`: Sort active on column with descending applied

  - `datatable-header-cell-label`: Header cell text label
    - `draggable`: Header cell draggable class

- `datatable-body-row`: Body row class
  - `datatable-row-even`: Odd row class
  - `datatable-row-odd`: Even row class

    - `datatable-body-cell`: Body cell class
      - `sort-active`: Sort active on column
      - `sort-asc`: Sort active on column with ascending applied
      - `sort-desc`: Sort active on column with descending applied
