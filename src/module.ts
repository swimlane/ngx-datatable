import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Angular2DataTableModule } from './angular2-data-table';

// import { App } from './demos/basic';
// import { App } from './demos/client-paging';
// import { App } from './demos/server-paging';
// import { App } from './demos/server-sorting';
// import { App } from './demos/selection';
// import { App } from './demos/expressive';
// import { App } from './demos/template';
// import { App } from './demos/details';
import { App } from './demos/virtual';

@NgModule({
  declarations: [ App ],
  imports: [ BrowserModule, Angular2DataTableModule ],
  bootstrap: [ App ]
})
export class AppModule { }
