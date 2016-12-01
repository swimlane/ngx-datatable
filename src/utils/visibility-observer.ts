import { NgZone } from '@angular/core';

export function checkVisibility(element: any, callback: any, zone: NgZone) {
  let timeout: any;

  function check() {
    // https://davidwalsh.name/offsetheight-visibility
    const { offsetHeight, offsetWidth } = element;

    if (offsetHeight && offsetWidth) {
      clearTimeout(timeout);
      if(callback) zone.run(() => callback());
    } else {
      clearTimeout(timeout);
      zone.runOutsideAngular(() => {
        timeout = setTimeout(() => check(), 50);
      });
    }
  }

  check();
}
