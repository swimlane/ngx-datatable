# Getting Started

After [Installing](installing.md), include `NgxDatatableModule` 
in your application module like:

```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [NgxDatatableModule, BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

then in your `app.component.ts` you define a table like:

```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <div>
      <ngx-datatable
        [rows]="rows"
        [columns]="columns">
      </ngx-datatable>
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

and your off to the races! 

For more examples, visit the 
[demos](https://github.com/swimlane/angular2-data-table/tree/master/demo) directory
in the source code!
