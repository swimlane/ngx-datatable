import { bootstrap } from '@angular/platform-browser-dynamic';

// import { App } from './demos/basic';
// import { App } from './demos/client-paging';
// import { App } from './demos/server-paging';
// import { App } from './demos/server-sorting';
// import { App } from './demos/selection';
// import { App } from './demos/expressive';
// import { App } from './demos/template';
import { App } from './demos/details';

document.addEventListener('DOMContentLoaded', () => {
  // bootstrap when document is ready
  bootstrap(App, [])
    .catch(err => console.error(err));
});
