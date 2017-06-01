import { camelCase } from './camel-case';

const cache = {};
const testStyle = document !== undefined ? document.createElement('div').style : undefined;

// Get Prefix
// http://davidwalsh.name/vendor-prefix
const prefix = (function() {
  const styles = window !== undefined ? window.getComputedStyle(document.documentElement, '') : undefined;
  const pre = styles !== undefined ? (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/))[1] : undefined;
  const dom = pre !== undefined ? ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1] : undefined;

  return dom ? {
    dom,
    lowercase: pre,
    css: `-${pre}-`,
    js: pre[0].toUpperCase() + pre.substr(1)
  } : undefined;
})();

export function getVendorPrefixedName(property: string) {
  const name = camelCase(property);


  if(!cache[name]) {    
    if(prefix !== undefined && testStyle[prefix.css + property] !== undefined) {
      cache[name] = prefix.css + property;
    } else if(testStyle[property] !== undefined) {
      cache[name] = property;
    }
        
  }

  return cache[name];
}
