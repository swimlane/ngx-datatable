# Virtual Scrolling
Demonstration of a table preloaded with 100k rows.

<iframe width="100%" height="450" frameborder="0" src="https://embed.plnkr.co/6h6oV3SpMywzR2hfDDWG?show=preview&autoCloseSidebar=true"></iframe>

## Details
So how does this work? We use a technique called virtual scrolling, which does the following:

- Measures the available height of the grid and subtracts the header and footer

- Calculate the number of rows that can fit in that space ( fix row heights only ). For example,
if the height of the grid was 300px and the header, footer and the row height was all 50px.
The available height for the table to render would be (300 - 100) / 50 = 4 rows. This would be the
page size that we would refer to in traditional paging.

- Take the page size and request your data from the server ( or maybe its already loaded). The total
count is returned from the server, lets say 100k for demonstration purposes. That means the total space
if all the rows were rendered would be 5 million px. That is taken and applied to a inner wrap height
simulating if all the rows were rendered.

- As the scroll is invoked, it calculates the new rows that need to be drawn. So (offsetY / row index) = page.
With that page number, you can either request new data from the server ( or have locally ) and replace
the current rows with the new data.

- Instead of tearing down the whole row and re-render it, we simply replace the existing value on the
innerHTML of the cell.

- To simulate the position, it uses `requestAnimation` and `translate-y` to update the Y position of the
row. This is done so the row update can be as fast as possible using GPU rather than absolute position.

Simple huh? ;)

## Important Notes

- Rows must have FIXED heights in order to calculate. If you need variable heights, you can not use
virtual scrolling. If you have lots of data you need to fit but can't fit it all in the available space
I recommend using a popover or something like that.
