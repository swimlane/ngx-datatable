import { getVendorPrefixedName } from './prefixes';
import { camelCase } from './camel-case';

// browser detection and prefixing tools
const transform = getVendorPrefixedName('transform');
const backfaceVisibility = getVendorPrefixedName('backfaceVisibility');
const hasCSSTransforms = !!getVendorPrefixedName('transform');
const hasCSS3DTransforms = !!getVendorPrefixedName('perspective');
const ua = window.navigator.userAgent;
const isSafari = (/Safari\//).test(ua) && !(/Chrome\//).test(ua);

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
