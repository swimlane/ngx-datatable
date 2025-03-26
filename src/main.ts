import { enableProdMode, importProvidersFrom } from '@angular/core';

import { environment } from './environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { NgxDatatableModule } from 'projects/ngx-datatable/src/public-api';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      AppRoutingModule,
      NgxDatatableModule.forRoot({
        messages: {
          emptyMessage: 'No data to display', // Message to show when array is presented, but contains no values
          totalMessage: 'total', // Footer total message
          selectedMessage: 'selected' // Footer selected message
        }
      })
    ),
    provideHttpClient()
  ]
}).catch(err => console.error(err));
