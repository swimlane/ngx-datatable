import { enableProdMode, importProvidersFrom } from '@angular/core';

import { environment } from './environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { routes } from './app/app-routing.module';
import { NgxDatatableModule } from 'projects/swimlane/ngx-datatable/src/public-api';
import { AppComponent } from './app/app.component';
import { provideRouter, withHashLocation } from '@angular/router';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      NgxDatatableModule.forRoot({
        messages: {
          emptyMessage: 'No data to display', // Message to show when array is presented, but contains no values
          totalMessage: 'total', // Footer total message
          selectedMessage: 'selected' // Footer selected message
        }
      })
    ),
    provideRouter(routes, withHashLocation()),
    provideHttpClient()
  ]
}).catch(err => console.error(err));
