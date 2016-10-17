import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

import { Angular2DataTableModule } from '../index';
import '../components/datatable.scss';

// import { App } from './basic-fixed';
// import { App } from './basic-auto';
// import { App } from './paging-client';
// import { App } from './paging-server';
// import { App } from './sorting-server';
// import { App } from './sorting-client';
// import { App } from './selection';
// import { App } from './virtual';
// import { App } from './inline';
// import { App } from './scrolling';
// import { App } from './pinning';
// import { App } from './multiple';
// import { App } from './column-toggle';
// import { App } from './column-standard';
// import { App } from './column-force';
// import { App } from './column-flex';
// import { App } from './fullscreen';
// import { App } from './template-dom';
// import { App } from './template-obj';
import { App } from './row-detail';

@NgModule({
  declarations: [App],
  imports: [BrowserModule, Angular2DataTableModule],
  bootstrap: [App]
})
export class AppModule {

  constructor(private appRef: ApplicationRef) { }

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
