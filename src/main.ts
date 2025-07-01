import { provideHttpClient } from '@angular/common/http';
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withHashLocation } from '@angular/router';
import { providedNgxDatatableConfig } from 'projects/ngx-datatable/src/public-api';

import { routes } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    providedNgxDatatableConfig({
      messages: {
        emptyMessage: 'No data to display', // Message to show when array is presented, but contains no values
        totalMessage: 'total', // Footer total message
        selectedMessage: 'selected', // Footer selected message
        ariaFirstPageMessage: 'go to first page', // Pager screen reader message for the first page button
        ariaPreviousPageMessage: 'go to previous page', // Pager screen reader message for the previous page button
        ariaPageNMessage: 'page', // Pager screen reader message for the n-th page button
        ariaNextPageMessage: 'go to next page', // Pager screen reader message for the next page button
        ariaLastPageMessage: 'go to last page' // Pager screen reader message for the last page button
      }
    }),
    provideRouter(routes, withHashLocation()),
    provideHttpClient()
  ]
}).catch(err => console.error(err));
