import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './module';

// bootstrap when document is ready
document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule);
});
