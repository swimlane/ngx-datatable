# Architecture 

### Manifesto
There is some things that it doesn't do nor do we plan to do. Lets say you have a requirement to have the 
ability to edit cell values in the row. Thats a awesome feature but somewhat catered to your use case. 
How do you invoke the edit? What type of control do you show in the cell? If its a date, 
do you have controls for that? Its a slippery slope...if you do want to do that you can use the 
expressive column templates to put whatever components inside your table you want.

What we wanted to do is design a table component that isn't bloated with 
features that won't fit every use case but instead make a component that does 
what it does the best possible and is flexible enough to allow you to do what you need 
to do to solve your requirement.

Some examples of the things we don't plan to build in this project are:
- Export such as CSV
- Context Menus
- Column Filters
- Column Toggling
- Inline Editing

If you are interested in building something like that for this project, I'm happy
to help point you in the right direction and would be happy to list a link as a 
extension.
