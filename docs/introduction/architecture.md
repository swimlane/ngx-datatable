# Architecture 

## OnPush
The table uses Angular2's `OnPush` change detection strategy for super-fast performance. It should be mentioned
that as a side effect the table now mutates its inputs. To learn more about ChangeDetection in Angular2
check out this [blog](http://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html).

### Manifesto
There is some things that it doesn't do nor do we plan to do. Lets say you have a requirement to have the ability to edit cell values in the row. Thats a awesome feature but somewhat catered to your use case. How do you invoke the edit? What type of control do you show in the cell? If its a date, do you have controls for that? Its a slippery slope...if you do want to do that you can use the expressive column templates to put whatever components inside your table you want.

What we wanted to do is design a table component that isn't bloated with features that won't fit every use case but instead make a component that does what it does the best possible and is flexible enough to allow you to do what you need to do to solve your requirement.
