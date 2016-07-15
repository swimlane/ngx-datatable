import 'es6-shim';
import 'ts-helpers';
import "reflect-metadata";
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import { bootstrap } from '@angular/platform-browser-dynamic';

//import { App } from './demos/basic';
//import { App } from './demos/client-paging';
//import { App } from './demos/server-paging';
//import { App } from './demos/server-sorting';
//import { App } from './demos/selection';
import { App } from './demos/expressive';

bootstrap(App, []);
