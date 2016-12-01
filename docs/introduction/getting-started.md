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
        [columns]="columns"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="'auto'">
      </swui-datatable>
    </div>
  `
})
export class AppComponent {
  rows = [];
  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];
}

```
