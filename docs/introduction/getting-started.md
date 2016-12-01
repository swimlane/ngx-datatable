# Getting Started

After [Installing](installing.md), include `Angular2DataTableModule` 
in your application module like:

```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Angular2DataTableModule } from 'angular2-data-table';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [Angular2DataTableModule, BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

then in your `app.component.ts` define the table like:

```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <div>
      <swui-datatable
        [rows]="rows"
        [columns]="columns">
      </swui-datatable>
    </div>
  `
})
export class AppComponent {
  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];
  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];
}
```

and your off to the races! For more examples, visit the [demos](https://github.com/swimlane/angular2-data-table/tree/master/demo) directory
in the source code!
