# Features
The table was designed to be *extremely flexible and light*; it doesn't make any assumptions about your data or how you: filter, sort or page it. That said, we wanted to keep the features strictly related to dealing with the data rather than implementing complex filtering/etc that is often very use-case specific. The current features include:

- Light codebase / No external dependencies
- Expressive Column Templates
- Column Reordering & Resizing
- Client/Server Pagination & Sorting
- Intelligent Column Width Algorithms ( Force-fill & Flex-grow )
- Integrated Pager
- Row Selection ( Single & Multi )
- Fixed AND Fluid height
- Decoupled theme'ing with included Google Material theme

### Roadmap
We are really excited about the table and wanted to get it out into the open as quickly as possible so we had to delay some of the features but we plan to add the following:

- Better RxJS Support
- Horizontal Scrolling
- Touch selection support
- Handle large data sets ( Virtual DOM )
- Virtual Paging
- Left and Right Column Pinning
- Rich Header Templates
- Checkbox Selection
- Tree Grids
- Row Grouping

### Architecture Manifesto
With all that said, there is some things that it doesn't do nor do we plan to do. Lets say you have a requirement to have the ability to edit cell values in the row. Thats a awesome feature but somewhat catered to your use case. How do you invoke the edit? What type of control do you show in the cell? If its a date, do you have controls for that? Its a slippery slope...if you do want to do that you can use the expressive column templates to put whatever components inside your table you want.

What we wanted to do is design a table component that isn't bloated with features that won't fit every use case but instead make a component that does what it does the best possible and is flexible enough to allow you to do what you need to do to solve your requirement.

### Alternatives
This might not be the best fit for you given the above, there are some other great solutions and some this project borrows from; heres a short list:

- [ng2-super-table](https://github.com/andyperlitch/ng2-super-table)
- [ng2-table](https://github.com/valor-software/ng2-table)
- [vaadin-grid](https://github.com/vaadin/vaadin-grid)
- [iron-data-table](https://github.com/Saulis/iron-data-table/)
- [paper-datatable](https://github.com/David-Mulder/paper-datatable)
