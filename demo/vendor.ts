// ng2
import { disableDebugTools } from '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import '@angular/common';

// RxJS
import 'rxjs/Rx';

// optimization for production
// https://github.com/AngularClass/angular2-webpack-starter/blob/master/src/platform/environment.ts#L17
if(IS_PRODUCTION) {
  disableDebugTools();
  enableProdMode();
}
