import { camelCase } from './camel-case';

let cache = {};
let testStyle = document.createElement('div').style;

// Get Prefix
// http://davidwalsh.name/vendor-prefix
const prefix = (function () {
  const styles = window.getComputedStyle(document.documentElement, '');
  const pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/))[1];
  const dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];

  return {
    dom,
    lowercase: pre,
    css: `-${pre}-`,
    js: pre[0].toUpperCase() + pre.substr(1)
  };
})();

export function getVendorPrefixedName(property) {
  const name = camelCase(property);

  if(!cache[name]) {
    if(testStyle[prefix.css + property] !== undefined) {
      cache[name] = prefix.css + property;
    } else if(testStyle[property] !== undefined) {
      cache[name] = property;
    }
  }

  return cache[name];
}
