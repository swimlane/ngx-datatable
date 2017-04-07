import { getVendorPrefixedName } from './prefixes';
import { camelCase } from './camel-case';
// browser detection and prefixing tools
var transform = getVendorPrefixedName('transform');
var backfaceVisibility = getVendorPrefixedName('backfaceVisibility');
var hasCSSTransforms = !!getVendorPrefixedName('transform');
var hasCSS3DTransforms = !!getVendorPrefixedName('perspective');
var ua = window.navigator.userAgent;
var isSafari = (/Safari\//).test(ua) && !(/Chrome\//).test(ua);
export function translateXY(styles, x, y) {
    if (hasCSSTransforms) {
        if (!isSafari && hasCSS3DTransforms) {
            styles[transform] = "translate3d(" + x + "px, " + y + "px, 0)";
            styles[backfaceVisibility] = 'hidden';
        }
        else {
            styles[camelCase(transform)] = "translate(" + x + "px, " + y + "px)";
        }
    }
    else {
        styles.top = y + "px";
        styles.left = x + "px";
    }
}
//# sourceMappingURL=translate.js.map