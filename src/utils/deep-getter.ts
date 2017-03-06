/**
 * Returns a deep object given a string. zoo['animal.type']
 * @param {object} obj
 * @param {string} path
 */
export function deepValueGetter(obj: object, path: string) {
  if(!obj || !path) return obj;

  let current = obj;
  const split = path.split('.');

  if(split.length) {
    for(let i = 0; i < split.length; i++) {
      current = current[split[i]];

      // if found undefined, return empty string
      if(current === undefined || current === null) return '';
    }
  }

  return current;
}
