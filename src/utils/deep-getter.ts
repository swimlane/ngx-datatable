/**
 * Returns a deep object given a string. zoo['animal.type']
 * @param {object} obj
 * @param {string} path
 */
export function deepValueGetter(obj, path) {
  if(!obj || !path) return obj;

  let current = obj;
  let split = path.split('.');

  if(split.length) {
    for(let i = 0, len = split.length; i < len; i++) {
      current = current[split[i]];
      
      // if found undefined, return empty string
      if(current === undefined || current === null) return '';
    }
  }

  return current;
}
