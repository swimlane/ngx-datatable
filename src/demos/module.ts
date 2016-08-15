import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Angular2DataTableModule } from '../angular2-data-table';

// import { App } from './basic';
// import { App } from './client-paging';
// import { App } from './server-paging';
// import { App } from './server-sorting';
// import { App } from './selection';
// import { App } from './expressive';
// import { App } from './template';
// import { App } from './details';
import { App } from './virtual';
// import { App } from './scrolling';

@NgModule({
  declarations: [ App ],
  imports: [ BrowserModule, Angular2DataTableModule ],
  bootstrap: [ App ]
})
export class AppModule { }
