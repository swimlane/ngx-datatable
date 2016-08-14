import { getVendorPrefixedName } from './prefixes';
import { camelCase } from './camelCase';

// browser detection and prefixing tools
let transform = getVendorPrefixedName('transform');
let backfaceVisibility = getVendorPrefixedName('backfaceVisibility');
let hasCSSTransforms = !!getVendorPrefixedName('transform');
let hasCSS3DTransforms = !!getVendorPrefixedName('perspective');
let ua = window.navigator.userAgent;
let isSafari = (/Safari\//).test(ua) && !(/Chrome\//).test(ua);

export function translateXY(styles, x, y) {
  if (hasCSSTransforms) {
    if (!isSafari && hasCSS3DTransforms) {
      styles[transform] = `translate3d(${x}px, ${y}px, 0)`;
      styles[backfaceVisibility] = 'hidden';
    } else {
      styles[camelCase(transform)] = `translate(${x}px, ${y}px)`;
    }
  } else {
    styles.top = `${y}px`;
    styles.left = `${x}px`;
  }
}
