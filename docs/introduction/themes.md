# Themes

Out of the box, the data-table is not styled. This gives you maximum flexibility.

There is a separate material theme distributed with data-table. In order to use it, you need to 
include that in your application `release/material.css` and add the CSS class `material` to your data-table.

## CSS Classes
- `data-table`: Master Table class
  - `fixed-header`: The header is fixed on the table

- `data-table-header`: Header row class
  - `data-table-header-cell`: Header cell class
    - `resizeable`: Cell resizeable class
    - `sortable`: Cell drag/drop sortable class
    - `longpress`: Cell long-press activated
    - `dragging`: Cell dragging activated
    - `sort-active`: Sort active on column
    - `sort-asc`: Sort active on column with ascending applied
    - `sort-desc`: Sort active on column with descending applied

  - `data-table-header-cell-label`: Header cell text label
    - `draggable`: Header cell draggable class

- `data-table-body-row`: Body row class
  - `data-table-row-even`: Odd row class
  - `data-table-row-odd`: Even row class

    - `data-table-body-cell`: Body cell class
      - `sort-active`: Sort active on column
      - `sort-asc`: Sort active on column with ascending applied
      - `sort-desc`: Sort active on column with descending applied
