import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './module';
import { decorateModuleRef } from './environment';

 document.addEventListener('DOMContentLoaded', () => {
   platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(decorateModuleRef)
    .catch(err => console.error(err));
 });
