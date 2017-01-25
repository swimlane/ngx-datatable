import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './module';

 document.addEventListener('DOMContentLoaded', () => {
   platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
 });
