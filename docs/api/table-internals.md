# Table Internals

## Row Indexes
Each row is decorated with a `$$index` attribute. This allows us to track the actual
index of the row. This is needed because if you are lazy loading data into the grid
the index upon which the data is loaded might not always be the 'actual' index its inserted.

This is also leveraged by the virtual scroll so it knows how to offset the row
in the page's view port.
