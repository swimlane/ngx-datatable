# Column Modes
Column modes allow you to have a variety of different ways to apply column width distribution
to the columns. The table comes with 3 modes; `standard`, `flex`, `force`.

## Standard
Columns are distributed given the width's defined in the column options.

## Flex
Flex mode distributes the width's grow factor relative to other columns.
It works the same as the [flex-grow API](http =//www.w3.org/TR/css3-flexbox/) in CSS.
Basically it takes any available extra width and distribute it proportionally
according to each column's `flexGrow` value.

Flex is **not** suggested for when using `scrollH`.

## Force
Force mode forces the widths of the columns to distribute equally but overflowing when
the min-width of each column is reached. The rules are:

- If combined withs are less than the total width of the grid,
  proportion the widths given the min / max / normal widths to fill the width.

- If the combined widths, exceed the total width of the grid, use the standard widths.

- If a column is resized, it should always use that width.

- The proportional widths should never fall below min size if specified.

- If the grid starts off small but then becomes greater than the size ( + / - )
  the width should use the original width; not the newly proportioned widths.

Force is usually the ideal column distribution method when columns do not need
to be a fixed sized.
