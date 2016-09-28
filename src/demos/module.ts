import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

import { Angular2DataTableModule } from '../index';
import '../components/datatable.scss';

// import { App } from './basic';
// import { App } from './client-paging';
// import { App } from './server-paging';
// import { App } from './server-sorting';
// import { App } from './selection';
import { App } from './expressive';
// import { App } from './template';
// import { App } from './details';
// import { App } from './virtual';
// import { App } from './inline';
// import { App } from './scrolling';
// import { App } from './pinning';
// import { App } from './multiple';

@NgModule({
  declarations: [App],
  imports: [BrowserModule, Angular2DataTableModule],
  bootstrap: [App]
})
export class AppModule {

  constructor(private appRef: ApplicationRef) {
  }

  hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    store.disposeOldHosts = createNewHosts(cmpLocation);
    removeNgStyles();
  }

  hmrAfterDestroy(store) {
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
